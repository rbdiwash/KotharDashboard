import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollTop from "components/ScrollTop";
import { Bounce, ToastContainer } from "react-toastify";
import Routes from "routes";
import "react-toastify/dist/ReactToastify.css";
import KotharProvider from "context/provider";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <KotharProvider>
        <ToastContainer position="bottom-center" autoClose={2000} />
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </KotharProvider>
    </QueryClientProvider>
  );
};
export default App;
