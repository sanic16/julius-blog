import classes from './SquareLoader.module.css'

const SquareLoader = () => {
  return (
    <div 
        className={`${classes.container}`}
    >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
  )
}

export default SquareLoader