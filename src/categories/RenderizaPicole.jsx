const RenderizaPicole = ({ Key, Array }) => {
    
    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    return (
        <div>
            <div key={Key} id={Key}>
                <h3>
                    <span>{Key == "agua" ? "Picolé a base d'água" : 
                            Key == "leite" ? "Picolé a base de Leite" : 
                            Key == "especial" ? "Picolé Especial" : Key}:</span> 
                    <span>Varejo</span> 
                    <span className="atacado">Atacado <span className="unidades">(60 Un.)</span></span>
                </h3>
                <ul>
                    {Array.map((product) => (
                        <li key={product.id}>
                            <span>{product.name}</span> <span>{formatPrice(product.retailPrice)}</span> <span className="atacado">{formatPrice(product.wholesalePrice)}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="img-container" id={`img-${Key}`}>
                <img src={`/img/${Key == "agua" ? "picoles" :
                                    Key == "leite" ? "picoles3" :
                                    Key == "especial" ? "picoles2" : Key}.png`} alt={Key} />
            </div>
        </div>
    )
}

export default RenderizaPicole;