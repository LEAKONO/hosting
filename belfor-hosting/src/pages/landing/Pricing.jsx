import { useState } from 'react';
import { PricingCards } from '../../components/landing';
import { Container, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1>Simple, Transparent Pricing</h1>
        <p className="lead">No hidden fees. No contracts. Cancel anytime.</p>
        
        <ToggleButtonGroup
          type="radio"
          name="billing-cycle"
          value={billingCycle}
          onChange={setBillingCycle}
          className="mt-3"
        >
          <ToggleButton id="monthly" value="monthly">
            Monthly Billing
          </ToggleButton>
          <ToggleButton id="annual" value="annual">
            Annual Billing (Save 20%)
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <PricingCards billingCycle={billingCycle} />
    </Container>
  );
}