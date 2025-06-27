import { useNavigate as useReactRouterNavigate } from "react-router"

export function useAppNavigate() {
    const navigate = useReactRouterNavigate()

    return {
        back: () => navigate(-1),
        home: () => navigate("/"),
        createRoom: () => navigate("/create-game"),
        joinRoom: (gameCode: string) => navigate(`/games/${gameCode}`),
        selectSeat: (gameCode: string, seat: number) => navigate(`/games/${gameCode}/seats/${seat}`),
        playRound: (gameCode: string, seat: number, roundNumber: number) =>
            navigate(`/games/${gameCode}/seats/${seat}/rounds/${roundNumber}`),
    }
}
