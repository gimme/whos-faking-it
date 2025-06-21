import { useNavigate as useReactRouterNavigate } from "react-router"

export function useAppNavigate() {
    const navigate = useReactRouterNavigate()

    return {
        back: () => navigate(-1),
        home: () => navigate("/"),
        createRoom: () => navigate("/create"),
        joinRoom: (gameCode: string) => navigate(`/${gameCode}`),
        selectSeat: (gameCode: string, seat: number) => navigate(`/${gameCode}/${seat}/1`),
        playRound: (gameCode: string, seat: number, roundNumber: number) =>
            navigate(`/${gameCode}/${seat}/${roundNumber}`),
    }
}
