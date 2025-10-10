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
                    <span className="atacado">Atacado <span className="unidades">(30 Un.)</span></span>
                </h3>
                <ul>
                    <li>
                        <span>Preço:</span>
                        <span>{formatPrice(product.retailPrice)}</span>
                        <span className="atacado">{formatPrice(product.wholesalePrice)}</span>
                    </li>
                </ul>
            </div>
            <div className="img-container" id={`img-caixa-${product.id}`}>
                <img 
                    src={`/img/${product.id === "56" ? "choco" : 
                                    product.id === "57" ? "copos" : 
                                    product.id === "58" ? "caixa" : "copos"}.png`} 
                    alt={product.name} 
                />
            </div>
        </div>
    );
}

export default RenderizaCaixa;