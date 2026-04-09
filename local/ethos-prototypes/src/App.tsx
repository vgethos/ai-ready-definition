import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrototypeIndex from './prototypes/index';
import MetaLpCtaV1 from './prototypes/iul/feb_2026/MetaLpCtaV1';
import IulGoals from './prototypes/iul/mar_2026/IulGoals';
import PolicyV1Cards from './prototypes/iul/mar_2026/guaranteed_vs_non/PolicyV1Cards';
import PolicyV2Chart from './prototypes/iul/mar_2026/guaranteed_vs_non/PolicyV2Chart';
import PolicyV3Ranges from './prototypes/iul/mar_2026/guaranteed_vs_non/PolicyV3Ranges';
import SdtbControl from './prototypes/iul/mar_2026/sales_direct_text_bridge/Control';
import SdtbVariantA from './prototypes/iul/mar_2026/sales_direct_text_bridge/VariantA';
import SdtbVariantB from './prototypes/iul/mar_2026/sales_direct_text_bridge/VariantB';
import SdtbVariantD from './prototypes/iul/mar_2026/sales_direct_text_bridge/VariantD';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrototypeIndex />} />
        <Route path="/iul/ref/lp" element={<MetaLpCtaV1 />} />
        <Route path="/iul/ref/pre-interview-single-select" element={<IulGoals />} />
        <Route path="/iul/guaranteed-vs-non/v1-cards" element={<PolicyV1Cards />} />
        <Route path="/iul/guaranteed-vs-non/v2-chart" element={<PolicyV2Chart />} />
        <Route path="/iul/guaranteed-vs-non/v3-ranges" element={<PolicyV3Ranges />} />
        <Route path="/iul/sales-direct-text-bridge/control" element={<SdtbControl />} />
        <Route path="/iul/sales-direct-text-bridge/v1" element={<SdtbVariantA />} />
        <Route path="/iul/sales-direct-text-bridge/v2" element={<SdtbVariantB />} />
        <Route path="/iul/sales-direct-text-bridge/v4" element={<SdtbVariantD />} />
      </Routes>
    </BrowserRouter>
  );
}
