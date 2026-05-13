export function LoadingState(
	{ message = "Cargando…" }: { message?: string }
) {
	return <p>{message}</p>;
}