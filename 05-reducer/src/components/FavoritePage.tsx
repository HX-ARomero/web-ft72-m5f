// FavoritesPage.tsx
import { useFavorites } from "../context/useFavorites";

export function FavoritesPage() {
  const { items, removeFavorite, clearFavorites } = useFavorites();

  return (
    <section>
      <h2>Favorites</h2>

      {items.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.title}

                <button onClick={() => removeFavorite(item.id)}>Remove</button>
              </li>
            ))}
          </ul>

          <button onClick={clearFavorites}>Clear favorites</button>
        </>
      )}
    </section>
  );
}
