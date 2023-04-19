import KotharContext from "./context";
import useStateAndActions from "./useStateAndActions";

const KotharProvider = ({ children }) => (
  <KotharContext.Provider value={useStateAndActions()}>
    {children}
  </KotharContext.Provider>
);

export default KotharProvider;
