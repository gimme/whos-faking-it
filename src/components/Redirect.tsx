import { Navigate, type NavigateProps, type Params, type To, useParams } from "react-router"

export function Redirect(props: NavigateProps) {
    const params = useParams()

    const updateTo = (to: To, params: Readonly<Params<string>>) => {
        const entries = Object.entries(params)
        let path = `${to}`

        entries.forEach(([key, value]) => {
            path = path.replace(`:${key}`, `${value}`)
        })

        return path
    }

    const to = updateTo(props.to, params)
    const replace = props.replace !== undefined ? props.replace : true

    return <Navigate {...props} to={to} replace={replace} />
}
