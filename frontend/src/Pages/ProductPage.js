import React from "react";
import { useParams } from "react-router-dom";

function ProductPage() {
    const params = useParams();
    const {token} = params;

    return(
        <div>{token}</div>
        
    )
}
export default ProductPage;