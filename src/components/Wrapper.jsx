const Wrapper = ({ children, className = "" }) => {
    return(
        <div className={`section ${className}`.trim()}>
            <div className="container">{children}
            </div>
        </div>
    )
    }
    
    export default Wrapper;