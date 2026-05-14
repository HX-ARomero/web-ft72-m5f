export function LoadingState() {
	return (
		<div role="status" aria-live="polite">
			Cargando productos…
		</div>
	);
}

export function ErrorState({
	message,
	onRetry,
}: {
	message: string;
	onRetry: () => void;
}) {
	return (
		<div role="alert">
			<p>Error: {message}</p>
			<button onClick={onRetry}>Reintentar</button>
		</div>
	);
}

export function EmptyState({
	variant,
}: {
	variant: "no-products" | "no-results";
}) {
	return (
		<div>
			{variant === "no-results"
				? "No hay resultados para tu búsqueda. Probá con otro término o cambiá la categoría."
				: "Todavía no hay productos en el catálogo."}
		</div>
	);
}