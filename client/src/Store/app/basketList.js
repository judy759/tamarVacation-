
// import { OrderList } from 'primereact/orderlist';
// const basketList=(props)=>{


//     const itemTemplate = (product) => {
//         return (
//             <div className="flex flex-wrap p-2 align-items-center gap-3">
//                 <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`http://localhost:7777/${product.image}`} alt={product.name} />
//                 <div className="flex-1 flex flex-column gap-2 xl:mr-8">
//                     <span className="font-bold">{product.name}</span>
//                     <div className="flex align-items-center gap-2">
//                         <i className="pi pi-tag text-sm"></i>
//                     </div>
//                 </div>
//                 <span className="font-bold text-900">${product.price}</span>
//             </div>
//         );
//     };

//     return (
//         <div className="card xl:flex xl:justify-content-center">
//             <OrderList dataKey="id" value={props.basket} itemTemplate={itemTemplate} header="My Basket" filter filterBy="name"></OrderList>
//         </div>
//     )
    
// }
// export default basketList