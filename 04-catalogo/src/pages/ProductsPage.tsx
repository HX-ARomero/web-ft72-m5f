import { useEffect, useState } from "react";
import { ProductGrid } from "../components/ProductGrid";
import {
  EmptyState, ErrorState, LoadingState
} from "../components/UIStates";
import { useProducts } from "../contexts/ProductsProvider";
import { useDebounce } from "../hooks/useDebounce";

const CATEGORIES = [
	{ id: "", label: "Todas" },
	{ id: "shoes", label: "Zapatillas" },
	{ id: "clothing", label: "Ropa" },
];

export function ProductsPage() {
	const {
		products,
		loading,
		error,
		hasMore,
		loadingMore,
		loadFirstPage,
		loadMore,
	} = useProducts();
	
	const [searchText, setSearchText] = useState("");
	const [categoryId, setCategoryId] = useState("");
	
	const debouncedSearch = useDebounce(searchText, 400);
	const searchPrefix = debouncedSearch.trim().toLowerCase();

  //* |NIKE AIR   
	
	useEffect(() => {
		loadFirstPage({
			categoryId: categoryId || null,
			searchPrefix:
				searchPrefix.length >= 2 ? searchPrefix : undefined,
		});
	}, [categoryId, searchPrefix, loadFirstPage]);
	
	const hasFilters = Boolean(searchPrefix || categoryId);
	
	return (
		<div className="catalogPage">
			<div className="filters">
				<input
					aria-label="Buscar productos"
					placeholder="Buscar (mín. 2 letras)"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
				
				<select
					aria-label="Categoría"
					value={categoryId}
					onChange={(e) => setCategoryId(e.target.value)}
				>
					{CATEGORIES.map((c) => (
						<option key={c.id} value={c.id}>
							{c.label}
						</option>
					))}
				</select>
			</div>
			
			{/* 🔹 Loading */}
			{loading && <LoadingState />}
			
			{/* 🔹 Error */}
			{!loading && error && (
				<ErrorState
					message={error}
					onRetry={() =>
						loadFirstPage({
							categoryId: categoryId || null,
							searchPrefix:
								searchPrefix.length >= 2
									? searchPrefix
									: undefined,
						})
					}
				/>
			)}
			
			{/* 🔹 Empty */}
			{!loading && !error && products.length === 0 && (
				<EmptyState
					variant={hasFilters ? "no-results" : "no-products"}
				/>
			)}
			
			{/* 🔹 Success */}
			{!loading && !error && products.length > 0 && (
				<>
					<ProductGrid products={products} />
					
					<button
						onClick={loadMore}
						disabled={loadingMore || !hasMore}
					>
						{loadingMore
							? "Cargando…"
							: hasMore
							? "Cargar más"
							: "No hay más productos"}
					</button>
				</>
			)}
		</div>
	);
}

// import { useEffect } from "react";
// import { listProducts } from "../services/productsService";

// export function ProductsPage() {
//   useEffect(() => {
//     listProducts({	categoryId: "shoes", searchPrefix: "ni",})
//       .then((res) => {
//         console.log("RESULTADO:", res);
//       });
//   }, []);

//   return <h1>Products Page</h1>;
// }

//! searchPrefix
//* ni => petición
//* nik => petición
//* nike => petición

//! INDEXADO EN FIRESTONE:
//* shoes   3 c  index: 3
//* lentes  5 b  index: 2
//* lentes  4 a  index: 1
//* shoes   2 b  index: 2
//* shoes   1 a  index: 1
//* lentes  6 c  index: 3