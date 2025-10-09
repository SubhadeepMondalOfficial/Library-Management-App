export const ErrorMessage = ({message}: {message: string}) => {
    return(
        <div className="bg-red-200 rounded px-2">{message}</div>
    )
}