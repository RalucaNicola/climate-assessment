import BottomPanel from '../BottomPanel';
import { ErrorAlert } from '../ErrorAlert';
import InfoModal from '../InfoModal';
import Map from '../Map';
import Popup from '../Popup';

const App = () => {
  return (
    <>
      <Map></Map>
      <BottomPanel></BottomPanel>
      <Popup></Popup>
      <ErrorAlert></ErrorAlert>
      <InfoModal></InfoModal>
    </>
  );
};

export default App;
