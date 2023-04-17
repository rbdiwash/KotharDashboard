import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollTop from "components/ScrollTop";
import { ToastContainer } from "react-toastify";
import Routes from "routes";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer />
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </QueryClientProvider>
  );
};
export default App;
