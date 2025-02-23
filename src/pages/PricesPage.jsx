import PricingPlan from "../components/home/PricingPlan";
import Testimonial from "../components/home/Testimonial";

const PricesPage = () => {
    return(
        <>
        <div class="jumbotron jumbotron-fluid mb-5">
            <div class="container text-center py-5">
                <h1 class="text-white display-3">Prices</h1>
                <div class="d-inline-flex align-items-center text-white">
                    <p class="m-0"><a class="text-white" href="home.html">Home</a></p>
                    <i class="fa fa-circle px-3"></i>
                    <p class="m-0">Prices</p>
                </div>
            </div>
        </div>
            <PricingPlan />
            <Testimonial />
        </>
    )
}

export default PricesPage;