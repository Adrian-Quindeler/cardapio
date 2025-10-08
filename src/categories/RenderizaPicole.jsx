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
                    <span>Atacado</span>
                </h3>
                <ul>
                    {Array.map((product) => (
                        <li key={product.id}>
                            <span>{product.name}:</span> <span>{formatPrice(product.retailPrice)}</span> <span>{formatPrice(product.wholesalePrice)}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="img-container" id={`img-${Key}`}>
                <img src={`/img/${Key == "agua" ? "copos" :
                                    Key == "leite" ? "copos2" :
                                    Key == "especial" ? "pote_tentacao" : Key}.png`} alt={Key} />
            </div>
        </div>
    )
}

export default RenderizaPicole;