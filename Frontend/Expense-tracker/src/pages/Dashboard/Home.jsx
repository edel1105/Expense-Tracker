import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import RecentTransactions from "../../Components/Dashboard/RecentTransactions";
import FinanceOverview from "../../Components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../Components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../Components/Dashboard/Last30DaysExpenses";
import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto"/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
          />

          <ExpenseTransactions
            transactions={
              dashboardData?.last30DaysExpenses?.transactions || []
            }
            onSeeMore={() => navigate("/expense")}
          />
          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};
export default Home;

