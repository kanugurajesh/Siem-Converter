import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Copy, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import style from "@/components/Editor/editor.module.css"

// Function to copy the text to clipboard it takes the id of the textarea as input
const copyToClipboard = (id:any) => {
  const text = document.querySelector(id)?.textContent
  navigator.clipboard.writeText(text || "")
  toast.success("Copied to clipboard")
}

// A component to copy the text from the input textarea
const CopyLeftText = () => {
  return (
    <Button variant="outline" size="icon" onClick={()=>copyToClipboard("#message-2")}>
      <Copy className="h-4 w-4" />
    </Button>
  )
}

// A component to copy the text from the output textarea
const CopyRightText = () => {
  return (
    <Button variant="outline" size="icon" onClick={()=>copyToClipboard("#message-3")}>
      <Copy className="h-4 w-4" />
    </Button>
  )
}

// A component to upload the yaml file from the user
const UploadFile = () => {

  // function to open the file dialog
  const handleClick = () => {
    toast.success("Select a file to upload")
    // @ts-ignore
    document.querySelector('input[type="file"]')?.click();
  }

  return (
    <Button variant="outline" size="icon" onClick={handleClick}>
      <Upload className="h-4 w-4" />
    </Button>
  )
}

// A component to take yaml file as input from the user
const TextareaWithRuleset = () => {

  // hook to store the yaml file content
  const [fileContent, setFileContent] = useState<string>("");

  // function to read the yaml file
  const handleFileChange = (e:any) => {
    toast.success("File uploaded successfully");
    const file = e.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  }

  // function to update the yaml file content
  const textAreaHandler = (e:any) => {
    setFileContent(e.target.value);
  }

  // function to delete the yaml file content
  const DeleteText = () => {
    return (
      <Button variant="outline" size="icon" onClick={()=>{
        setFileContent("");
        toast.success("File deleted successfully");
      }}>
        <Trash className="h-4 w-4" />
      </Button>
    )
  }

  // function to copy the yaml file content
  useEffect(() => {
    document.querySelector("#message-2")?.setAttribute("value", fileContent);
  }, [fileContent])

  return (
    <div className="grid w-full gap-2 h-[150px] mb-10">
      <Label htmlFor="message-2" className='font-bold text-base'>ruleset/rule.yml</Label>
      <div className="flex items-center gap-2">
        <Textarea placeholder="Type your ruleset here" id="message-2" className="mt-3 h-[150px]" value={fileContent} onChange={textAreaHandler}/>
        <div className="flex flex-col gap-2">
          <input type="file" className="hidden" onChange={handleFileChange}/>
          <UploadFile />
          <CopyLeftText />
          <DeleteText />
        </div>
      </div>
    </div>
  )
}

// A component to show the converted yaml file to the users
const TextareaWithSigma = () => {
  return (
    <div className="grid w-full gap-2 h-[150px]">
      <Label htmlFor="message-3" className='font-bold text-base'>Your sigma</Label>
      <div className="flex items-center gap-2">
        <Textarea placeholder="converted ruleset" id="message-3" className="mt-3 h-[150px]"/>
        <div className="flex flex-col gap-2">
          <CopyRightText />
        </div>
      </div>
    </div>
  )
}

// The main component
const Component = () => {
  return (
      <div className={`px-10 py-10 flex gap-5 justify-between ${style.editor}`}>
        <TextareaWithRuleset />
        <TextareaWithSigma />
      </div>
  );
};

export default Component;
