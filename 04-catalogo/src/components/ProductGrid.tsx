import type { Product } from "../types/Prouct";

export function ProductGrid({ products }: { products: Product[] }) {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
				gap: 16,
			}}
		>
			{products.map((p) => (
				<article key={p.id}>
					{p.image && <img src={p.image} alt={p.name} />}
					<h3>{p.name}</h3>
					<p>${p.price}</p>
				</article>
			))}
		</div>
	);
}