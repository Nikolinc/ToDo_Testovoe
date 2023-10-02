import "./progressbar.css"

function ProgressBar(props: { filled: number }) {
  return (<div className="progressbar">
    <div style={{
      height: "100%",
      width: `${props.filled}%`,
      backgroundColor: "var(--secondary)",
      transition: "width 0.5s"
    }}></div>
  </div>)
}

export default ProgressBar