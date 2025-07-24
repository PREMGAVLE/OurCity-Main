// import Dashboard from "./dash_component/Dashboard";
// import DashboardLayout from "./dash_component/DashboardLayout";
import DashRoute from "./dash_component/DashRoute";
// import RegisterBusinessForm from "./dash_component/RegisterBusinessForm";


const DashboardMain: React.FC = () => {
  return (
    <div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Customers"
          value={3782}
          percentage={11.01}
          isIncrease={true}
        />
        <StatCard
          title="Orders"
          value={5359}
          percentage={-9.05}
          isIncrease={false}
        />
        <TargetCard
          percentage={75.55}
          amount={3287}
          target={20}
        />
      </div> */}

      {/* If you still need Dashboard below */}
      <div className="mt-10">
        {/* <Dashboard /> */}
        {/* <Dashboard/> */}
    {/* <Layout/> */}
    <DashRoute/>
        {/* <RegisterBusinessForm /> */}
        
      </div>
    </div>
  );
};

export default DashboardMain;

