import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import toast, { Toaster } from "react-hot-toast"
import inputdata from "@/components/InputData/inputdata.module.css"
import { ListRestart } from "lucide-react"
import { useEffect, useState } from "react"
import {v4 as uuidv4} from "uuid"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Blockquote with a copy button so that the user can copy the commands
const TypographyBlockquote = () => {
  return (
    <blockquote className=" border-l-2 pl-6 py-2 italic" id="blockquote-text">
      "After all," he said, "everyone enjoys a good joke, so it's only fair that
      they should pay for the privilege."
    </blockquote>
  )
}

// Copy button to copy the commands
const ButtonIcon = () => {
  return (
    <Button variant="outline" size="icon" onClick={copyToClipboard}>
      <Copy className="h-4 w-4" />
    </Button>
  )
}

// Function to copy the commands to clipboard
const copyToClipboard = () => {
  const text = document.querySelector("#blockquote-text")?.textContent
  navigator.clipboard.writeText(text || "")
  toast.success("Copied to clipboard")
}

// Default function to take inputs from the user
export default function SelectDemo() {

  // hooks to store the data from the backend service
  const [myBackends, setMyBackends] = useState(new Set());
  const [myPipelines, setMyPipelines] = useState(new Set());
  const [myOutputFormats, setMyOutputFormats] = useState(new Set());
  
  // hooks to store the data selected by the user
  const [selectedBackend, setSelectedBackend] = useState("")
  const [selectedOutputFormat, setSelectedOutputFormat] = useState("")
  const [mySelectedPipelines, setMySelectedPipelines] = useState(new Set());

  // hooks to store dynamic options based on backend select
  const [renderOutputFormat, setRenderOutputFormat] = useState(new Set())
  const [renderPipelines, setRenderPipelines] = useState(new Set())

  // function to add the selected pipelines to the list
  const addPipeline = (e:any) => {
    setMySelectedPipelines(new Set([...mySelectedPipelines, {value:e, label:e}]));
  }

  // function containing the logic to reset the set
  const resetList = () => {
    setMySelectedPipelines(new Set());
    toast.success("list resetting done")
  }

  // A button to reset the list
  const ResetButton = () => {
    return (
      <Button variant="outline" size="icon" onClick={resetList}>
        <ListRestart className="h-4 w-4" />
      </Button>
    )
  }

  // chaning the command line
  const changeCommandLine = () => {

    let commandLine = document.getElementById("blockquote-text")

    let cliCommand = "sigma convert"

    if (mySelectedPipelines.size === 0) {
      cliCommand += " --without-pipeline"
    }

    mySelectedPipelines.forEach((item:any) => {
      cliCommand += ` -p ${item.value}`
    })

    cliCommand += ` -t ${selectedBackend} -f ${selectedOutputFormat} + "rule.yml`
    commandLine!.innerText = cliCommand

  }

  const changeBackend = (e:any) => {

    setSelectedBackend(e)
    
    // filter e from the list of formats in backends
    const formats = Array.from(myOutputFormats).filter((item:any) => item.backends.includes(e) || item.backends.includes("all"))

    // filter e from the list of pipelines in backends
    const pipelines = Array.from(myPipelines).filter((item:any) => item.backends.includes(e) || item.backends.includes("all"))

    // set the new list of formats and pipelines
    setRenderOutputFormat(new Set(formats))
    setRenderPipelines(new Set(pipelines))

  }

  // function to set output format
  const changeOutputFormat = (e:any) => {
    setSelectedOutputFormat(e)
  }

  // @ts-ignore
  useEffect(() => {

    fetch("http://localhost:8000/")
    .then(response => response.json())
    .then(data => {

      const backends = JSON.parse(data.backends)
      const pipelines = JSON.parse(data.pipelines)
      const formats = JSON.parse(data.formats)

      const backendsList = new Set()

      const formatsList = new Set()

      const pipelineList = new Set()

      for (const [value, value1] of Object.entries(backends)) {
        // @ts-ignore
        backendsList.add({name:value1,value:value})
      }

      for (const elem of Object.entries(formats)) {
        // @ts-ignore
        formatsList.add({name:elem[1].name, backends:elem[1].backends})
      }

      for (const elem of Object.entries(pipelines)) {
        // @ts-ignore
        pipelineList.add({name:elem[1].name ,backends:elem[1].backends})
      }

      setMyBackends(backendsList)
      setMyPipelines(pipelineList)
      setMyOutputFormats(formatsList)

    })
  },[])

  useEffect(() => {

    changeCommandLine()

    // it should not execute on the first render
    if (mySelectedPipelines.size > 0 || selectedBackend || selectedOutputFormat) {
      let outputSigma = document.getElementById("message-3")
      // @ts-ignore
      let inputRuleset = document.getElementById("message-2")?.value

      const params = {
        rule: btoa(inputRuleset || ""),
        pipeline: Array.from(mySelectedPipelines).map((item:any) => item.value),
        target: selectedBackend,
        format: selectedOutputFormat
      }
      
      fetch("http://localhost:8000/sigma", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      })
      .then(response => {
        if(selectedOutputFormat === "json") {
          return response.text()
        } else {
          return response.text()
        }
      })
      .then(data => {
        if(selectedOutputFormat !== "json") {
          data = data.replace(/\\n/g, "")
          data = data.substring(2, data.length - 2)
        }
        outputSigma!.innerText = data
      })
    }
  },[selectedBackend, selectedOutputFormat, mySelectedPipelines])

  return (
    <div className={`flex gap-5 px-10 py-8 border-b-2 ${inputdata.mw} justify-between items-center`}>
      <Toaster />
      <div className={`flex gap-5 justify-center items-center ${inputdata.flexdata}`}>
        <Select onValueChange={(e)=>changeBackend(e)}>
          <SelectTrigger className={`w-[180px]`}>
            <SelectValue placeholder="Select target" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Targets</SelectLabel>
              {Array.from(myBackends).map((item:any) => (
                <SelectItem value={item.value} key={uuidv4()} >{item.value}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(e) => changeOutputFormat(e)}>
          <SelectTrigger className={`w-[180px]`}>
            <SelectValue placeholder="Select output format" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Output formats</SelectLabel>
              {Array.from(renderOutputFormat).map((item:any) => (
                <SelectItem value={item.name} key={uuidv4()}>{item.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(e)=>addPipeline(e)}>
          <SelectTrigger className={`w-[180px]`}>
            <SelectValue placeholder="Select pipelines" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Pipelines</SelectLabel>
              {Array.from(renderPipelines).map((item:any) => (
                <SelectItem value={item.name} key={uuidv4()}>{item.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>    
        <Select>
          <SelectTrigger className={`w-[180px]`}>
            <SelectValue placeholder="Selected pipelines" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Selected Pipelines</SelectLabel>
              {Array.from(mySelectedPipelines).map((item:any) => (
                <SelectItem disabled value={item.value} key={uuidv4()}>{item.label}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ResetButton />
      </div>
      <div className="flex gap-4 items-center justify-between">
        <TypographyBlockquote />
        <ButtonIcon />
      </div>
    </div>
  )
}
