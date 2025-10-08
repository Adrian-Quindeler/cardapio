import { useState, useEffect } from 'react'
import productsData from './products'
import ShowProducts from './ShowProducts'

function App() {
	const [products, setProducts] = useState({});
	const [category, setCategory] = useState('potes');

	useEffect(() => {
		setProducts(productsData)
	}, [])
	

	return (
		<div className="app">
			<h1>Cardápio de Produtos</h1>
			<div className="category-buttons">
				<button className={category == 'potes' ? 'active' : ''}   onClick={() => setCategory("potes")}>Potes</button>
				<button className={category == 'caixas' ? 'active' : ''}  onClick={() => setCategory("caixas")}>Caixas</button>
				<button className={category == 'picoles' ? 'active' : ''} onClick={() => setCategory("picoles")}>Picoles</button>
			</div>
			<div className='conteudo'>
				<ShowProducts products={products} category={category} />
			</div>
		</div>
	)
}

export default App
