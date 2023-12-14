import base64 # for decoding the rule
import json
import yaml

# from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# from sigma.conversion.base import Backend
from sigma.plugins import InstalledSigmaPlugins
from sigma.collection import SigmaCollection
from sigma.exceptions import SigmaError
from sigma.conversion.base import Backend
from pydantic import BaseModel

# initialize the FastAPI app
app = FastAPI()

plugins = InstalledSigmaPlugins.autodiscover()
backends = plugins.backends
pipeline_resolver = plugins.get_pipeline_resolver()
pipelines = list(pipeline_resolver.list_pipelines())

# writing a class for the request body
class Item(BaseModel):
    """A Sigma rule."""
    rule: str
    pipeline: list
    target: str
    format: str

# Configure CORS settings
origins = [
    "*"
]

# Adding CORS middleware rules
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def serialize_class(obj):
    """ Serializes a class to JSON."""
    return obj.__name__

@app.get("/")
def read_root():
    """ Returns a list of all available backends, pipelines and formats. """
    # create a set called formats
    formats = []
    pipeline_list = []
    
    for backend in backends.keys():
        for name, description in plugins.backends[backend].formats.items():
            formats.append({"name": name, "backends": backend})
            
    for name, pipeline in pipelines:
        if len(pipeline.allowed_backends) > 0:
            pipeline.backends = ", ".join(pipeline.allowed_backends)
            pipeline_list.append({"name":name, "backends":pipeline.backends})
        else:
            pipeline.backends = "all"
            pipeline_list.append({"name":name, "backends":pipeline.backends})
    
    json_string = json.dumps(backends,default=serialize_class)
    json_pipeline = json.dumps(pipeline_list)
    formats = json.dumps(formats)
    return {"backends":json_string,"pipelines":json_pipeline,"formats":formats}

@app.post("/sigma")
def convert(request: Item):
    """ Converts a Sigma rule to a backend format. """
    # get rule from the request
    rule = str(base64.b64decode(request.rule).decode("utf-8"))

    try:
        yaml.safe_load(rule)
    except Exception:
        return {"error":"invalid rule"}
    
    pipeline = []
    
    if request.pipeline:
        for p in request.pipeline:
            pipeline.append(p)
    # print(pipeline)            
    target = request.target
    formats = request.format

    backend_class = backends[target]
    try:
        processing_pipeline = pipeline_resolver.resolve(pipeline)
        backend : Backend = backend_class(processing_pipeline=processing_pipeline)
    except Exception:
        return "Error: Pipeline not found"

    try:
        sigma_rule = SigmaCollection.from_yaml(rule)
        result = backend.convert(sigma_rule, formats)
        if isinstance(result, str):
            result = result[0]
    except SigmaError as e:
        return "Error: " + str(e)
    return result
    