const RenderizaCaixa = ({ product }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    return (
        <div key={product.id}>
            <div id={`product-${product.id}`}>
                <h3>
                    <span>{product.name}:</span>
                    <span>Varejo</span>
                    <span>Atacado</span>
                </h3>
                <ul>
                    <li>
                        <span>Preço:</span>
                        <span>{formatPrice(product.retailPrice)}</span>
                        <span>{formatPrice(product.wholesalePrice)}</span>
                    </li>
                </ul>
            </div>
            <div className="img-container" id={`img-caixa-${product.id}`}>
                <img 
                    src={`/img/${product.id === "56" ? "copos" : 
                                    product.id === "57" ? "copos2" : 
                                    product.id === "58" ? "choco" : "copos"}.png`} 
                    alt={product.name} 
                />
            </div>
        </div>
    );
}

export default RenderizaCaixa;