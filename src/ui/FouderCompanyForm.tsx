import React from "react";
import { Form, Input, DatePicker } from "antd";

const FounderCompanyForm: React.FC<{
  founderCompany: any;
  setFounderCompany: any;
}> = ({ founderCompany, setFounderCompany }) => {
  const handleAddressChange = (e: any, index: any) => {
    const { name, value } = e.target;
    setFounderCompany((prevState: any) => {
      const addresses = [...prevState.addresses];
      addresses[index] = { ...addresses[index], [name]: value };
      return { ...prevState, addresses };
    });
  };

  const handleIdentityDocumentChange = (e: any, index: any) => {
    const { name, value } = e.target;
    setFounderCompany((prevState: any) => {
      const founderPersons = [...prevState.founderPersons];
      founderPersons[index].identityDocument = {
        ...founderPersons[index].identityDocument,
        [name]: value,
      };
      return { ...prevState, founderPersons };
    });
  };

  const handleDateChange = (
    date: any,
    dateString: any,
    field: any,
    index: any
  ) => {
    setFounderCompany((prevState: any) => {
      const founderPersons = [...prevState.founderPersons];
      //@ts-ignore
      founderPersons[index].identityDocument[field] = dateString;
      return { ...prevState, founderPersons };
    });
  };

  const handlePersonDataChange = (e: any, index: any) => {
    const { name, value } = e.target;
    setFounderCompany((prevState: any) => {
      const founderPersons = [...prevState.founderPersons];
      founderPersons[index].personData = {
        ...founderPersons[index].personData,
        [name]: value,
      };
      return { ...prevState, founderPersons };
    });
  };

  return (
    <Form layout="vertical">
      <h3>Addresses</h3>
      {founderCompany.addresses.map((address: any, index: any) => (
        <Form.Item label="Country" key={index}>
          <Input
            name="country"
            value={address.country}
            onChange={(e) => handleAddressChange(e, index)}
          />
        </Form.Item>
      ))}

      <h3>Founder Persons</h3>
      {founderCompany.founderPersons.map((person: any, index: any) => (
        <div key={index}>
          <Form.Item label="Phone">
            <Input
              name="phone"
              value={person.phone}
              onChange={(e) => handlePersonDataChange(e, index)}
            />
          </Form.Item>
          <Form.Item label="Gender">
            <Input
              name="gender"
              value={person.identityDocument.gender}
              onChange={(e) => handleIdentityDocumentChange(e, index)}
            />
          </Form.Item>
          <Form.Item label="Issued Date">
            <DatePicker
              onChange={(date, dateString) =>
                handleDateChange(date, dateString, "issuedDate", index)
              }
            />
          </Form.Item>
        </div>
      ))}
    </Form>
  );
};

export default FounderCompanyForm;
