import styles from "./dashboard.module.css";
import telehome from "../../assets/telehome.png"
import { CgMicrosoft } from "react-icons/cg";
import { FiUser } from "react-icons/fi";
import { AiOutlineFileProtect } from "react-icons/ai";
import { IoAnalytics } from "react-icons/io5";
import { BiMessageSquareDetail } from "react-icons/bi";
import { MdFactCheck } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { FiSettings } from "react-icons/fi";    
import { IoIosAdd } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
// import { VscPreview } from "react-icons/vsc";   
import {useState} from 'react'


const orders=[
    {
        productName:'Anh Quoc',
        productNumber:'1360',
        paymentStatus:'Paid',
        shipping:'Decline'
    },
    {
        productName:'Thu Hien',
        productNumber:'1259',
        paymentStatus:'Paid',
        shipping:'pending'
    },{
        productName:'Dinh Khoi',
        productNumber:'1008',
        paymentStatus:'Paid',
        shipping:'Delivered'
    },{
        productName:'Van Duy',
        productNumber:'1223',
        paymentStatus:'Paid',
        shipping:'pending'
    },{
        productName:'Phuoc Long',
        productNumber:'1154',
        paymentStatus:'Paid',
        shipping:'pending'
    },{
        productName:'Minh Nhat',
        productNumber:'1111',
        paymentStatus:'Paid',
        shipping:'Delivered'
    },{
        productName:'Quoc Tuan',
        productNumber:'1888',
        paymentStatus:'Paid',
        shipping:'pending'
    },{
        productName:'Duc Minh',
        productNumber:'1777',
        paymentStatus:'Paid',
        shipping:'Delivered'
    },{
        productName:'Khiet Tuong',
        productNumber:'1666',
        paymentStatus:'Paid',
        shipping:'Delivered'
    },{
        productName:'Minh Chinh',
        productNumber:'1143',
        paymentStatus:'Paid',
        shipping:'Delivered'
    },  
]


function Dashboard(){
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


    const HandleThemeToggle =()=>{
        document.body.classList.toggle(styles["dark-theme-variables"]);
        SetCheckTG(!checkTG);
        console.log("aa");
    }

    const [checkTG,SetCheckTG]=useState(false);

    return(
        <div className={styles["container"]}>
            <aside>
                <div className={styles["top"]}>
                    <img src={telehome}></img>
                    <div className={styles["tele"]}>
                        <h2 className={styles["text-muted"]}>TEL<span className={styles["danger"]}>EXERCISE</span></h2>
                    </div>      
                </div>
                <div className={styles["sidebar"]}>
                    <a href="#">
                        <span class="material-symbols-outlined">
                            <CgMicrosoft />
                        </span>
                        <h3>Dashboard</h3>
                    </a>
                    <a href="#" className={styles["active"]}>
                        <span class="material-symbols-outlined">
                            <FiUser/>
                        </span>
                        <h3>Customers</h3>
                    </a>            
                    <a href="#">
                        <span className="material-symbols-outlined">
                            <AiOutlineFileProtect/>
                        </span>
                        <h3>Orders</h3>
                    </a>
                    <a href="#">
                        <span className="material-symbols-outlined">
                            <IoAnalytics/>
                        </span>
                        <h3>Analytics</h3>
                    </a>
                    <a href="#">
                        <span className="material-symbols-outlined">
                            <BiMessageSquareDetail/>
                        </span>
                        <h3>Messages</h3>
                        <span className={styles["message-count"]}>26</span>
                    </a>
                    <a href="#">
                        <span className="material-symbols-outlined">
                            <MdFactCheck/>
                        </span>
                        <h3>Products</h3>
                    </a>
                    <a href="#">
                        <span className="material-symbols-outlined">
                            <MdErrorOutline/>
                        </span>
                        <h3>Reports</h3>
                    </a>
                    <a href="#">
                        <span className="material-symbols-outlined">
                            <FiSettings/>   
                        </span>
                        <h3>Settings</h3>
                    </a>
                    <a href="#">
                        <span className="material-symbols-outlined">
                            <IoIosAdd/>
                        </span>
                        <h3>Add Product</h3>
                    </a>
                    <a href="#">
                        <span className="material-symbols-outlined">
                            <CgLogOut/>
                        </span>
                        <h3>Logout</h3>
                    </a>
                </div>
            </aside>
            <main>
                <h1>Dashboard</h1>
                <div className={styles["date"]}>
                    <h1>{date}</h1>
                </div>

                <div className={styles["insights"]}>
                    <div className={styles["sales"]}>
                        <span className="material-symbols-outlined">analytics</span>
                        <div className={styles["middle"]}>
                            <div className={styles["left"]}>
                                <h3>Total Sales</h3>
                                <h1>$25,024</h1>
                            </div>
                            <div className={styles["progress"]}>
                                <svg>
                                    <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div className={styles["number"]}>
                                    <p>81%</p>
                                </div>
                            </div>  
                        </div>
                        <small className={styles["text-muted"]}>Last 24 Hours</small>
                    </div>
                    {/* <!-- END OF SALES --> */}
                    <div className={styles["expenses"]}>
                        <span className="material-symbols-outlined">bar_chart</span>
                        <div className={styles["middle"]}>
                            <div className={styles["left"]}>   
                                <h3>Total Expenses</h3>
                                <h1>$14,160</h1>
                            </div>
                            <div className={styles["progress"]}>
                                <svg>
                                    <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div className={styles["number"]}>
                                    <p>62%</p>
                                </div>
                            </div>
                        </div>
                        <small className={styles["text-muted"]}>Last 24 Hours</small>
                    </div>
                        {/* END OF EXPENSES  */}
                    <div className={styles["income"]}>
                        <span className="material-symbols-outlined">stacked_line_chart</span>
                        <div className={styles["middle"]}>
                            <div className={styles["left"]}>
                                <h3>Total Income</h3>
                                <h1>$10,806</h1>
                            </div>
                            <div className={styles["progress"]}>
                                <svg>
                                    <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div className={styles["number"]}>
                                    <p>44%</p>
                                </div>
                            </div>
                        </div>
                        <small className={styles["text-muted"]}>Last 24 Hours</small>
                    </div>
                </div>
                {/* Recent-orders */}
                <div className={styles["recent-orders"]}>
                <h2>Recent-order</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Number</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>Foldable Mini Drone</td>
                            <td>85613</td>
                            <td>Due</td>
                            <td class="warning">Pending</td>
                            <td class="primary">Details</td>
                        </tr>
                        <tr>
                            <td>Foldable Mini Drone</td>
                            <td>85613</td>
                            <td>Due</td>
                            <td class="warning">Pending</td>
                            <td class="primary">Details</td>
                        </tr>
                        <tr>
                            <td>Foldable Mini Drone</td>
                            <td>85613</td>
                            <td>Due</td>
                            <td class="warning">Pending</td>
                            <td class="primary">Details</td>
                        </tr>
                        <tr>
                            <td>Foldable Mini Drone</td>
                            <td>85613</td>
                            <td>Due</td>
                            <td class="warning">Pending</td>
                            <td class="primary">Details</td>
                        </tr>
                        <tr>
                            <td>Foldable Mini Drone</td>
                            <td>85613</td>
                            <td>Due</td>
                            <td class="warning">Pending</td>
                            <td class="primary">Details</td>
                        </tr>
                        <tr>
                            <td>Foldable Mini Drone</td>
                            <td>85613</td>
                            <td>Due</td>
                            <td class="warning">Pending</td>
                            <td class="primary">Details</td>
                        </tr>
                        <tr>
                            <td>Foldable Mini Drone</td>
                            <td>85613</td>
                            <td>Due</td>
                            <td class="warning">Pending</td>
                            <td class="primary">Details</td>
                        </tr> */}
                        
                        {
                            orders.map(order=>(
                                <tr>
                                    <td>{order.productName}</td>
                                    <td>{order.productNumber}</td>
                                    <td>{order.paymentStatus}</td>
                                    <td className={order.shipping===
                                        'Decline'?'danger':order.
                                        shipping === 'pending'?'warning'
                                        :'primary'}>{order.shipping}</td>
                                    <td class="primary">Details</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <a href="#">Show All</a>
            </div>
            </main>
            {/* RIGHT */}
            <div className={styles["right"]}>
            <div className={styles["top"]}>
                <button id="menu-btn">
                    <span class="material-symbols-outlined">menu</span>
                </button>
                <div className={styles["theme-toggler"]} onClick={HandleThemeToggle}>
                    <span id={(checkTG==true)?styles["aaa"]:styles["bbb"]}className="material-symbols-outlined">light_mode</span>
                    <span id={(checkTG==false)?styles["aaa"]:styles["bbb"]}className="material-symbols-outlined">dark_mode</span>    
                </div>
                <div  className={styles["profile"]}>
                    <div className={styles["info"]}>
                        <p>Hey, <b>AnhQuoc</b></p>
                        <small className={styles["text-muted"]}>Admin</small>
                    </div>
                    <div className={styles["profile-photo"]}>
                        <img src={telehome}></img>
                    </div>
                </div>
            </div>
            {/* <!-- End OF TOP --> */}
            <div className={styles["recent-updates"]}>
                <h2>Recent Updates</h2>
                <div className={styles["updates"]}>
                    <div className={styles["update"]}>
                        <div className={styles["profile-photo"]}>
                            <img src={telehome}></img>
                        </div>
                        <div className={styles["message"]}>
                            <p><b>Mike Tyson</b>received his oder of Night lion tech PGS drone.</p>
                            <small className={styles["text-muted"]}>2 Minutes Ago</small>
                        </div>
                    </div>
                    <div className={styles["update"]}>
                        <div className={styles["profile-photo"]}>
                            <img src={telehome}></img>
                        </div>
                        <div className={styles["message"]}>
                            <p><b>Mike Tyson</b>received his oder of Night lion tech PGS drone.</p>
                            <small className={styles["text-muted"]}>2 Minutes Ago</small>
                        </div>
                    </div>
                    <div className={styles["update"]}>
                        <div className={styles["profile-photo"]}>
                            <img src={telehome}></img>
                        </div>
                        <div className={styles["message"]}>
                            <p><b>Mike Tyson</b>received his oder of Night lion tech PGS drone.</p>
                            <small className={styles["text-muted"]}>2 Minutes Ago</small>
                        </div>
                    </div>
                </div>
            </div>  
            {/* <!-- END OF RECENT-UPDATES --> */}
            <div className={styles["sales-analytics"]}>
                <h2>Sales Analytics</h2>
                <div className={`${styles["item"]} ${styles["online"]}`}>   
                    <div className={styles["icon"]} >
                        <span class="material-symbols-outlined">
                            shopping_cart
                        </span>
                    </div>
                    <div className={styles["right"]}>
                        <div className={styles["info"]}>
                            <h3>ONLINE</h3>
                            <small className={styles["text-muted"]}>Last 24 Hours</small>
                        </div>
                        <h5 className={styles["danger"]}>+39%</h5>
                        <h3>3849</h3>
                    </div>
                </div>
                <div className={`${styles["item"]} ${styles["offline"]}`}>
                    <div className={styles["icon"]}>
                        <span class="material-symbols-outlined">
                            shopping_cart
                            </span>
                    </div>
                    <div className={styles["right"]}>
                        <div className={styles["info"]}>
                            <h3>OFFLINE ORDERS</h3>
                            <small className={styles["text-muted"]}>Last 24 Hours</small>
                        </div>
                        <h5 className={styles["success"]}>-17%</h5>
                        <h3>1100</h3>
                    </div>
                </div>
                <div className={styles["item online"]}>
                    <div className={styles["icon"]}>
                        <span class="material-symbols-outlined">
                            person
                            </span>
                    </div>
                    <div className={styles["right"]}>
                        <div className={styles["info"]}>
                            <h3>NEW CUSTOMERS</h3>
                            <small className={styles["text-muted"]}>Last 24 Hours</small>
                        </div>
                        <h5 className={styles["success"]}>+25%</h5>
                        <h3>849</h3>
                    </div>
                </div>
                <div className={`${styles["item"]} ${styles["add-product"]}`}>
                    <div>
                        <span class="material-symbols-outlined">add</span>
                        <h3>Add Product</h3>
                    </div>
                </div>
            </div>
        </div>
        </div>  
    )
}

export default Dashboard;