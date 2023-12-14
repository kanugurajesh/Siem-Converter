import {ModeToggle} from "@/components/Header/mode-toggle"
import header from "@/components/Header/header.module.css"

const TypographyH1 = () => {
  return (
    <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl tracking-wide">
      SigTrans
    </h1>
  )
}

const TypographyP = () => {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-3">
      Convert ruleset to SIEM query
    </p>
  )
}

function Header() {

  return (
      <div className={`px-10 py-5 flex justify-between border-b-2 items-center ${header.mw}`}>
        <div className="flex flex-col">
          <TypographyH1 />
          <TypographyP />
        </div>
        <ModeToggle />
      </div>
  )
}

export default Header