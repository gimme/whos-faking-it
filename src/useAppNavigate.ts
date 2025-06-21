import { useNavigate as useReactRouterNavigate } from "react-router"

export function useAppNavigate() {
    const navigate = useReactRouterNavigate()

    return {
        back: () => navigate(-1),
        home: () => navigate("/"),
        createRoom: () => navigate("/create"),
        joinRoom: (gameCode: string) => navigate(`/${gameCode}/seats`),
        selectSeat: (gameCode: string, seat: number) => navigate(`/${gameCode}/seats/${seat}/rounds/1`),
        playRound: (gameCode: string, seat: number, roundNumber: number) =>
            navigate(`/${gameCode}/seats/${seat}/rounds/${roundNumber}`),
    }
}
