import React from "react";
import { Form, Input, DatePicker, InputNumber } from "antd";

const BankGuaranteeForm: React.FC<{
  bankGuarantee: any;
  setBankGuarantee: any;
}> = ({ bankGuarantee, setBankGuarantee }) => {
  const handleProcurementChange = (e: any) => {
    const { name, value } = e.target;
    setBankGuarantee((prevState: any) => ({
      ...prevState,
      procurement: { ...prevState.procurement, [name]: value },
    }));
  };

  const handleProcurementDateChange = (
    date: any,
    dateString: any,
    field: any
  ) => {
    setBankGuarantee((prevState: any) => ({
      ...prevState,
      procurement: { ...prevState.procurement, [field]: dateString },
    }));
  };

  const handleBeneficiaryChange = (e: any) => {
    const { name, value } = e.target;
    setBankGuarantee((prevState: any) => ({
      ...prevState,
      beneficiary: { ...prevState.beneficiary, [name]: value },
    }));
  };

  const handleBeneficiaryAddressChange = (e: any, index: any) => {
    const { name, value } = e.target;
    setBankGuarantee((prevState: any) => {
      const addresses = [...prevState.beneficiary.addresses];
      addresses[index] = { ...addresses[index], [name]: value };
      return {
        ...prevState,
        beneficiary: { ...prevState.beneficiary, addresses },
      };
    });
  };

  const handleDateChange = (date: any, dateString: any, field: any) => {
    setBankGuarantee((prevState: any) => ({
      ...prevState,
      [field]: dateString,
    }));
  };

  return (
    <Form layout="vertical">
      <h3>Bank Guarantee</h3>
      <Form.Item label="Bank Guarantee Sum">
        <InputNumber
          name="bankGuaranteeSum"
          value={bankGuarantee.bankGuaranteeSum}
          onChange={(value) =>
            setBankGuarantee((prevState: any) => ({
              ...prevState,
              bankGuaranteeSum: value,
            }))
          }
        />
      </Form.Item>

      <h3>Procurement</h3>
      <Form.Item label="Procurement Type">
        <Input
          name="procurementType"
          value={bankGuarantee.procurement.procurementType}
          onChange={handleProcurementChange}
        />
      </Form.Item>
      <Form.Item label="Tender Date">
        <DatePicker
          onChange={(date, dateString) =>
            handleProcurementDateChange(date, dateString, "tenderDate")
          }
        />
      </Form.Item>

      <h3>Beneficiary</h3>
      <Form.Item label="Full Name">
        <Input
          name="fullName"
          value={bankGuarantee.beneficiary.fullName}
          onChange={handleBeneficiaryChange}
        />
      </Form.Item>
      {bankGuarantee.beneficiary.addresses.map((address: any, index: any) => (
        <Form.Item label="Country" key={index}>
          <Input
            name="country"
            value={address.country}
            onChange={(e) => handleBeneficiaryAddressChange(e, index)}
          />
        </Form.Item>
      ))}

      <Form.Item label="End Date">
        <DatePicker
          onChange={(date, dateString) =>
            handleDateChange(date, dateString, "endDate")
          }
        />
      </Form.Item>
    </Form>
  );
};

export default BankGuaranteeForm;
