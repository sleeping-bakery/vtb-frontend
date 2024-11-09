import { useEffect, useState } from "react";
import { GuaranteesField } from "./Guarantees.styled";
import { useAppSelector } from "../../app/store/hooks";
import { selectToken } from "../../app/store/user/userSlice";
import {
  createGuarantee,
  deleteGuarantee,
  getGuarantee,
  getGuaranteeDetails,
} from "../../shared/api/guarantee";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import {
  AddressTypeEnum,
  CountryEnum,
  RegionEnum,
} from "../../shared/consts/enums";
import { TRANSLATED_ADDRESS_TYPE } from "../../shared/consts/consts";
import FounderCompanyForm from "../../ui/FouderCompanyForm";
import BankGuaranteeForm from "../../ui/BackGuaranteeForm";

export const Guarantees = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [data, setData] = useState([]);
  const token = useAppSelector(selectToken);
  const [address, setAddress] = useState({
    country: 0,
    region: 0,
    addressType: 0,
    address: "",
    zipcode: "",
    provinceType: "",
    province: "",
    districtType: "",
    district: "",
    cityType: "",
    city: "",
    locationType: "",
    location: "",
    streetType: "",
    street: "",
    house: "",
    housing: "",
    building: "",
    apartmentNumber: "",
    kladr: "",
    okato: "",
  });
  const [companyInfo, setCompanyInfo] = useState({
    orgType: "",
    companyHead: {
      id: "",
      personData: {
        lastName: "",
        firstName: "",
        secondName: "",
        personAttributes: {
          citizenship: "",
          addresses: [
            {
              country: "",
              region: "",
              addressType: "",
              address: "",
              zipcode: "",
              provinceType: "",
              province: "",
              districtType: "",
              district: "",
              cityType: "",
              city: "",
              locationType: "",
              location: "",
              streetType: "",
              street: "",
              house: "",
              housing: "",
              building: "",
              apartmentNumber: "",
              kladr: "",
              okato: "",
            },
          ],
          inn: "",
          snils: "",
        },
      },
      identityDocument: {
        gender: "",
        number: "",
        series: "",
        issuedDate: null,
        issuingAuthority: "",
        issuingAuthorityCode: "",
        birthDate: null,
        birthPlace: "",
      },
      authorizingDoc: "",
      contacts: [
        {
          email: "",
          phone: "",
        },
      ],
    },
  });
  const [bankDetails, setBankDetails] = useState({
    bank: {
      bik: "",
      corrNumber: "",
      name: "",
    },
    number: "",
  });
  const [companyDetails, setCompanyDetails] = useState({
    authorizedShareCapital: 0,
    fullName: "",
    shortName: "",
    okopf: "",
    okfs: "",
    oktmo: "",
    registrationAuthorityName: "",
    okpo: "",
    okved: "",
    okvedName: "",
    inn: "",
    kpp: "",
    ogrn: "",
    regDateBefore01072002: null,
    regDate: null,
    averageNumber: 0,
  });
  const [contactPerson, setContactPerson] = useState({
    lastName: "",
    firstName: "",
    secondName: "",
    contact: {
      email: "",
      phone: "",
    },
  });
  const [founderCompanies, setFounderCompanies] = useState({
    id: "",
    guaranteeCompanyInfo: {
      guaranteeOrgType: "",
      fullName: "",
      shortName: "",
      okopf: "",
      okfs: "",
      okpo: "",
      okved: "",
      okvedName: "",
      inn: "",
      kpp: "",
      ogrn: "",
      regDateBefore01072002: null,
      regDate: null,
    },
  });
  const [founderCompany, setFounderCompany] = useState({
    addresses: [
      {
        country: "",
        region: "",
        addressType: "",
        address: "",
        zipcode: "",
        provinceType: "",
        province: "",
        districtType: "",
        district: "",
        cityType: "",
        city: "",
        locationType: "",
        location: "",
        streetType: "",
        street: "",
        house: "",
        housing: "",
        building: "",
        apartmentNumber: "",
        kladr: "",
        okato: "",
      },
    ],
    sharePercent: 0,
    founderPersons: [
      {
        id: "",
        phone: "",
        identityDocument: {
          gender: "",
          number: "",
          series: "",
          issuedDate: null,
          issuingAuthority: "",
          issuingAuthorityCode: "",
          birthDate: null,
          birthPlace: "",
        },
        personData: {
          lastName: "",
          firstName: "",
          secondName: "",
          personAttributes: {
            citizenship: "",
            addresses: [
              {
                country: "",
                region: "",
                addressType: "",
                address: "",
                zipcode: "",
                provinceType: "",
                province: "",
                districtType: "",
                district: "",
                cityType: "",
                city: "",
                locationType: "",
                location: "",
                streetType: "",
                street: "",
                house: "",
                housing: "",
                building: "",
                apartmentNumber: "",
                kladr: "",
                okato: "",
              },
            ],
            inn: "",
            snils: "",
          },
        },
        sharePercent: 0,
        shareSum: 0,
      },
    ],
  });
  const [bankGuarantee, setBankGuarantee] = useState({
    bankGuaranteeClientType: 1,
    procurement: {
      procurementType: 1,
      contractCommercialObjectType: 1,
      tenderType: "",
      tenderDate: null,
      purchaseNumber: "",
      ikz: "",
      purchasePublishedDate: null,
      subject: "",
      contractMaxPrice: 0,
      lotNumber: "",
      lotName: "",
      okpd: [{ code: "" }],
      tenderContractNumber: "",
      tenderContractRegNumber: "",
      tenderContractSignedDate: null,
      tenderContractSubject: "",
      contractCommercialObjectDescription: "",
      contractCommercialNumber: "",
      contractCommercialDate: null,
      withoutNumber: false,
    },
    bankGuaranteeSum: 0,
    beneficiary: {
      fullName: "",
      shortName: "",
      inn: "",
      kpp: "",
      ogrn: "",
      okopf: "",
      oktmo: "",
      okpo: "",
      okved: "",
      okvedName: "",
      addresses: [
        {
          country: "",
          region: "",
          addressType: "",
          address: "",
          zipcode: "",
          provinceType: "",
          province: "",
          districtType: "",
          district: "",
          cityType: "",
          city: "",
          locationType: "",
          location: "",
          streetType: "",
          street: "",
          house: "",
          housing: "",
          building: "",
          apartmentNumber: "",
          kladr: "",
          okato: "",
        },
      ],
    },
    endDate: null,
    requiredExecutionDate: null,
    startDate: null,
    parentId: "",
    annualInterestRate: 0,
  });

  useEffect(() => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      const handleSaveData = (data: any) => {
        setData(data.data);
      };

      getGuarantee(process.env.REACT_APP_BACKEND_URL, token, handleSaveData);
    }
  }, [token]);

  const handleSubmit = () => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      const body: any = {
        principal: {
          id: "string",
          addresses: [address],
          bankAccounts: [bankDetails],
          companyInfo: companyInfo,
          contactPerson: contactPerson,
          founders: {
            founderCompanies: [
              {
                founderCompanies,
                founderCompany,
              },
            ],
            accountStatement: {
              annualReportData: {
                dateStart: "2024-11-07T07:14:07.031Z",
                dateEnd: "2024-11-07T07:14:07.031Z",
                b1100: 0,
                b1110: 0,
                b1120: 0,
                b1130: 0,
                b1140: 0,
                b1150: 0,
                b1160: 0,
                b1170: 0,
                b1180: 0,
                b1190: 0,
                b1200: 0,
                b1210: 0,
                b1220: 0,
                b1230: 0,
                b1240: 0,
                b1250: 0,
                b1260: 0,
                b1300: 0,
                b1310: 0,
                b1320: 0,
                b1340: 0,
                b1350: 0,
                b1360: 0,
                b1370: 0,
                b1400: 0,
                b1410: 0,
                b1420: 0,
                b1430: 0,
                b1450: 0,
                b1500: 0,
                b1510: 0,
                b1520: 0,
                b1530: 0,
                b1540: 0,
                b1550: 0,
                b1600: 0,
                b1700: 0,
                b2100: 0,
                b2110: 0,
                b2120: 0,
                b2200: 0,
                b2210: 0,
                b2220: 0,
                b2300: 0,
                b2310: 0,
                b2320: 0,
                b2330: 0,
                b2340: 0,
                b2350: 0,
                b2400: 0,
                b2410: 0,
                b2411: 0,
                b2412: 0,
                b2460: 0,
                b2500: 0,
                b2510: 0,
                b2520: 0,
                b2530: 0,
                b2900: 0,
                b2910: 0,
                b5640: 0,
              },
              quarterReportData: {
                dateStart: "2024-11-07T07:14:07.031Z",
                dateEnd: "2024-11-07T07:14:07.031Z",
                b1100: 0,
                b1110: 0,
                b1120: 0,
                b1130: 0,
                b1140: 0,
                b1150: 0,
                b1160: 0,
                b1170: 0,
                b1180: 0,
                b1190: 0,
                b1200: 0,
                b1210: 0,
                b1220: 0,
                b1230: 0,
                b1240: 0,
                b1250: 0,
                b1260: 0,
                b1300: 0,
                b1310: 0,
                b1320: 0,
                b1340: 0,
                b1350: 0,
                b1360: 0,
                b1370: 0,
                b1400: 0,
                b1410: 0,
                b1420: 0,
                b1430: 0,
                b1450: 0,
                b1500: 0,
                b1510: 0,
                b1520: 0,
                b1530: 0,
                b1540: 0,
                b1550: 0,
                b1600: 0,
                b1700: 0,
                b2100: 0,
                b2110: 0,
                b2120: 0,
                b2200: 0,
                b2210: 0,
                b2220: 0,
                b2300: 0,
                b2310: 0,
                b2320: 0,
                b2330: 0,
                b2340: 0,
                b2350: 0,
                b2400: 0,
                b2410: 0,
                b2411: 0,
                b2412: 0,
                b2460: 0,
                b2500: 0,
                b2510: 0,
                b2520: 0,
                b2530: 0,
                b2900: 0,
                b2910: 0,
                b5640: 0,
              },
            },
          },
          bankGuarantee: bankGuarantee,
          files: [
            {
              group: 1,
              fileUploadType: 1,
              objectId: "string",
              detachedSignature: {
                signature: "string",
              },
              externalDocumentId: "string",
              fileName: "string",
            },
          ],
        },
      };
      createGuarantee(process.env.REACT_APP_BACKEND_URL, body, token);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addressTypeKeys = Object.keys(AddressTypeEnum).filter((key) =>
    isNaN(Number(key))
  );
  const addressTypeValues = addressTypeKeys.map(
    (key) => AddressTypeEnum[key as keyof typeof AddressTypeEnum]
  );

  const regionKeys = Object.keys(RegionEnum).filter((key) =>
    isNaN(Number(key))
  );
  const regionValues = regionKeys.map(
    (key) => RegionEnum[key as keyof typeof RegionEnum]
  );

  const countryKeys = Object.keys(CountryEnum).filter((key) =>
    isNaN(Number(key))
  );
  const countryValues = countryKeys.map(
    (key) => CountryEnum[key as keyof typeof CountryEnum]
  );

  const handleChangeBank = (e: any) => {
    const { name, value } = e.target;

    if (["bik", "corrNumber", "name"].includes(name)) {
      setBankDetails((prevState) => ({
        ...prevState,
        bank: {
          ...prevState.bank,
          [name]: value,
        },
      }));
    } else {
      setBankDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleChangeOrg = (e: any) => {
    const { name, value } = e.target;

    setCompanyInfo((prevState) => {
      const keys = name.split(".");
      let updatedState = { ...prevState };

      let pointer = updatedState;
      for (let i = 0; i < keys.length - 1; i++) {
        //@ts-ignore
        pointer = pointer[keys[i]];
      }
      //@ts-ignore
      pointer[keys[keys.length - 1]] = value;

      return updatedState;
    });
  };

  const handleDateChange = (date: any, dateString: any, field: any) => {
    setCompanyInfo((prevState) => ({
      ...prevState,
      companyHead: {
        ...prevState.companyHead,
        identityDocument: {
          ...prevState.companyHead.identityDocument,
          [field]: dateString,
        },
      },
    }));
  };

  const handleCompanyInfoChange = (e: any) => {
    const { name, value } = e.target;
    setCompanyDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChangeCompanyInfo = (
    date: any,
    dateString: any,
    field: any
  ) => {
    setCompanyDetails((prevState) => ({
      ...prevState,
      [field]: dateString,
    }));
  };

  const handleNumberChange = (value: any, field: any) => {
    setCompanyDetails((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleContactPersonChange = (e: any) => {
    const { name, value } = e.target;
    setContactPerson((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContactInfoChange = (e: any) => {
    const { name, value } = e.target;
    setContactPerson((prevState) => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        [name]: value,
      },
    }));
  };

  const handleFounderCompaniesChange = (e: any) => {
    const { name, value } = e.target;
    setFounderCompanies((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGuaranteeCompanyInfoChange = (e: any) => {
    const { name, value } = e.target;
    setFounderCompanies((prevState) => ({
      ...prevState,
      guaranteeCompanyInfo: {
        ...prevState.guaranteeCompanyInfo,
        [name]: value,
      },
    }));
  };

  const handleFounderCompaniesDateChange = (
    date: any,
    dateString: any,
    field: any
  ) => {
    setFounderCompanies((prevState) => ({
      ...prevState,
      guaranteeCompanyInfo: {
        ...prevState.guaranteeCompanyInfo,
        [field]: dateString,
      },
    }));
  };

  const [details, setDetails] = useState<any>([]);

  const handleGetDetails = (id: string) => {
    const handleSaveDetails = (data: any) => {
      console.log(data.data);
      setDetails([...details, { [id]: data.data }]);
    };

    if (process.env.REACT_APP_BACKEND_URL && token) {
      getGuaranteeDetails(
        process.env.REACT_APP_BACKEND_URL,
        token,
        handleSaveDetails,
        id
      );
    }
  };

  const handleDeleteGuarantee = (id: string) => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      deleteGuarantee(process.env.REACT_APP_BACKEND_URL, id, token);
    }
  };

  return (
    <GuaranteesField>
      <Button
        onClick={() => {
          setFormOpen(!formOpen);
        }}
      >
        Создать гарантию
      </Button>
      <br />
      <br />
      {data.map((itemData: any) => (
        <div key={itemData.id}>
          <p>{itemData.responseInit.orderNumber}</p>

          <br />
          {details.filter(
            (itemFilter: any) =>
              Object.keys(itemFilter)[0] === itemData.responseInit.orderId
          ).length > 0 && (
            <div>
              {String(
                details.filter(
                  (itemFilter: any) =>
                    Object.keys(itemFilter)[0] === itemData.responseInit.orderId
                )[0][itemData.responseInit.orderId].label
              )}
              <br />
              {String(
                details.filter(
                  (itemFilter: any) =>
                    Object.keys(itemFilter)[0] === itemData.responseInit.orderId
                )[0][itemData.responseInit.orderId].statusDescription
              )}
              <br />
              <br />
              {String(
                details.filter(
                  (itemFilter: any) =>
                    Object.keys(itemFilter)[0] === itemData.responseInit.orderId
                )[0][itemData.responseInit.orderId].annualInterestRate
              )}
              <br />
              {String(
                details.filter(
                  (itemFilter: any) =>
                    Object.keys(itemFilter)[0] === itemData.responseInit.orderId
                )[0][itemData.responseInit.orderId].bankGuaranteeSum
              )}
              <br />
              {String(
                details.filter(
                  (itemFilter: any) =>
                    Object.keys(itemFilter)[0] === itemData.responseInit.orderId
                )[0][itemData.responseInit.orderId].commission
              )}
              <br />
            </div>
          )}

          <Button
            onClick={() => {
              handleGetDetails(itemData.responseInit.orderId);
            }}
          >
            Получить детали
          </Button>
          <br />
          <Button
            onClick={() => {
              handleDeleteGuarantee(itemData.responseInit.orderId);
            }}
          >
            Удалить гарантию
          </Button>
        </div>
      ))}
      {data.length > 0 && formOpen && (
        <div>
          <br />
          <br />

          <Divider />

          <br />
          <br />
        </div>
      )}
      {formOpen && (
        <div>
          <Form layout="vertical">
            <Form.Item label="Country">
              <Select
                placeholder="Выбрать страну"
                options={countryKeys.map((item: any, index: number) => {
                  return {
                    value: countryValues[index],
                    label: item,
                  };
                })}
                value={address.country}
                style={{ width: 150 }}
                onChange={(value) => {
                  const updatedData = { ...address };

                  updatedData.country = value;

                  setAddress(updatedData);
                }}
              />
            </Form.Item>

            <Form.Item label="Region">
              <Select
                placeholder="Выбрать регион"
                options={regionValues.map((item: any) => {
                  return {
                    value: item,
                    label: item,
                  };
                })}
                value={address.region}
                style={{ width: 150 }}
                onChange={(value) => {
                  const updatedData = { ...address };

                  updatedData.region = value;

                  setAddress(updatedData);
                }}
              />
            </Form.Item>
            <Form.Item label="Address Type">
              <Select
                placeholder="Выбрать тип адреса"
                options={addressTypeKeys.map((item: any, index: number) => {
                  return {
                    value: addressTypeValues[index],
                    label: TRANSLATED_ADDRESS_TYPE[item],
                  };
                })}
                value={address.addressType}
                style={{ width: 150 }}
                onChange={(value) => {
                  const updatedData = { ...address };

                  updatedData.addressType = value;

                  setAddress(updatedData);
                }}
              />
            </Form.Item>
            <Form.Item label="Address">
              <Input
                name="address"
                value={address.address}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Zipcode">
              <Input
                name="zipcode"
                value={address.zipcode}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Province Type">
              <Input
                name="provinceType"
                value={address.provinceType}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Province">
              <Input
                name="province"
                value={address.province}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="District Type">
              <Input
                name="districtType"
                value={address.districtType}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="District">
              <Input
                name="district"
                value={address.district}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="City Type">
              <Input
                name="cityType"
                value={address.cityType}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="City">
              <Input name="city" value={address.city} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Location Type">
              <Input
                name="locationType"
                value={address.locationType}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Location">
              <Input
                name="location"
                value={address.location}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Street Type">
              <Input
                name="streetType"
                value={address.streetType}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Street">
              <Input
                name="street"
                value={address.street}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="House">
              <Input
                name="house"
                value={address.house}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Housing">
              <Input
                name="housing"
                value={address.housing}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Building">
              <Input
                name="building"
                value={address.building}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Apartment Number">
              <Input
                name="apartmentNumber"
                value={address.apartmentNumber}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="KLADR">
              <Input
                name="kladr"
                value={address.kladr}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="OKATO">
              <Input
                name="okato"
                value={address.okato}
                onChange={handleChange}
              />
            </Form.Item>

            <h2>Bank</h2>

            <Form.Item label="BIK">
              <Input
                name="bik"
                value={bankDetails.bank.bik}
                onChange={handleChangeBank}
              />
            </Form.Item>
            <Form.Item label="Correspondent Number">
              <Input
                name="corrNumber"
                value={bankDetails.bank.corrNumber}
                onChange={handleChangeBank}
              />
            </Form.Item>
            <Form.Item label="Bank Name">
              <Input
                name="name"
                value={bankDetails.bank.name}
                onChange={handleChangeBank}
              />
            </Form.Item>
            <Form.Item label="Account Number">
              <Input
                name="number"
                value={bankDetails.number}
                onChange={handleChangeBank}
              />
            </Form.Item>
          </Form>

          <h2>Organization</h2>

          <Form.Item label="Organization Type">
            <Input
              name="orgType"
              value={companyInfo.orgType}
              onChange={handleChangeOrg}
            />
          </Form.Item>

          <h3>Company Head</h3>
          <Form.Item label="ID">
            <Input
              name="companyHead.id"
              value={companyInfo.companyHead.id}
              onChange={handleChangeOrg}
            />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input
              name="companyHead.personData.lastName"
              value={companyInfo.companyHead.personData.lastName}
              onChange={handleChangeOrg}
            />
          </Form.Item>
          <Form.Item label="First Name">
            <Input
              name="companyHead.personData.firstName"
              value={companyInfo.companyHead.personData.firstName}
              onChange={handleChangeOrg}
            />
          </Form.Item>
          <Form.Item label="Second Name">
            <Input
              name="companyHead.personData.secondName"
              value={companyInfo.companyHead.personData.secondName}
              onChange={handleChangeOrg}
            />
          </Form.Item>
          <Form.Item label="Citizenship">
            <Input
              name="companyHead.personData.personAttributes.citizenship"
              value={
                companyInfo.companyHead.personData.personAttributes.citizenship
              }
              onChange={handleChangeOrg}
            />
          </Form.Item>

          <h3>Address</h3>
          <Form.Item label="Country">
            <Input
              name="companyHead.personData.personAttributes.addresses[0].country"
              value={
                companyInfo.companyHead.personData.personAttributes.addresses[0]
                  .country
              }
              onChange={handleChangeOrg}
            />
          </Form.Item>

          <h3>Identity Document</h3>
          <Form.Item label="Gender">
            <Input
              name="companyHead.identityDocument.gender"
              value={companyInfo.companyHead.identityDocument.gender}
              onChange={handleChangeOrg}
            />
          </Form.Item>
          <Form.Item label="Number">
            <Input
              name="companyHead.identityDocument.number"
              value={companyInfo.companyHead.identityDocument.number}
              onChange={handleChangeOrg}
            />
          </Form.Item>
          <Form.Item label="Series">
            <Input
              name="companyHead.identityDocument.series"
              value={companyInfo.companyHead.identityDocument.series}
              onChange={handleChangeOrg}
            />
          </Form.Item>
          <Form.Item label="Issued Date">
            <DatePicker
              onChange={(date, dateString) =>
                handleDateChange(date, dateString, "issuedDate")
              }
            />
          </Form.Item>
          <Form.Item label="Issuing Authority">
            <Input
              name="companyHead.identityDocument.issuingAuthority"
              value={companyInfo.companyHead.identityDocument.issuingAuthority}
              onChange={handleChangeOrg}
            />
          </Form.Item>
          <Form.Item label="Birth Date">
            <DatePicker
              onChange={(date, dateString) =>
                handleDateChange(date, dateString, "birthDate")
              }
            />
          </Form.Item>
          <Form.Item label="Birth Place">
            <Input
              name="companyHead.identityDocument.birthPlace"
              value={companyInfo.companyHead.identityDocument.birthPlace}
              onChange={handleChangeOrg}
            />
          </Form.Item>

          <h3>Contacts</h3>
          <Form.Item label="Email">
            <Input
              name="companyHead.contacts[0].email"
              value={companyInfo.companyHead.contacts[0].email}
              onChange={handleChangeOrg}
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              name="companyHead.contacts[0].phone"
              value={companyInfo.companyHead.contacts[0].phone}
              onChange={handleChangeOrg}
            />
          </Form.Item>

          <h2>Company info</h2>

          <Form.Item label="Authorized Share Capital">
            <InputNumber
              min={0}
              value={companyDetails.authorizedShareCapital}
              onChange={(value) =>
                handleNumberChange(value, "authorizedShareCapital")
              }
            />
          </Form.Item>
          <Form.Item label="Full Name">
            <Input
              name="fullName"
              value={companyDetails.fullName}
              onChange={handleCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="Short Name">
            <Input
              name="shortName"
              value={companyDetails.shortName}
              onChange={handleCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="OKOPF">
            <Input
              name="okopf"
              value={companyDetails.okopf}
              onChange={handleCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="OKFS">
            <Input
              name="okfs"
              value={companyDetails.okfs}
              onChange={handleCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="OKTMO">
            <Input
              name="oktmo"
              value={companyDetails.oktmo}
              onChange={handleCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="Registration Authority Name">
            <Input
              name="registrationAuthorityName"
              value={companyDetails.registrationAuthorityName}
              onChange={handleCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="OKPO">
            <Input
              name="okpo"
              value={companyDetails.okpo}
              onChange={handleCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="OKVED">
            <Input
              name="okved"
              value={companyDetails.okved}
              onChange={handleCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="OKVED Name">
            <Input
              name="okvedName"
              value={companyDetails.okvedName}
              onChange={handleCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="INN">
            <Input
              name="inn"
              value={companyDetails.inn}
              onChange={handleCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="KPP">
            <Input
              name="kpp"
              value={companyDetails.kpp}
              onChange={handleCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="OGRN">
            <Input
              name="ogrn"
              value={companyDetails.ogrn}
              onChange={handleCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="Reg Date Before 01.07.2002">
            <DatePicker
              onChange={(date, dateString) =>
                handleDateChangeCompanyInfo(
                  date,
                  dateString,
                  "regDateBefore01072002"
                )
              }
            />
          </Form.Item>
          <Form.Item label="Registration Date">
            <DatePicker
              onChange={(date, dateString) =>
                handleDateChangeCompanyInfo(date, dateString, "regDate")
              }
            />
          </Form.Item>
          <Form.Item label="Average Number of Employees">
            <InputNumber
              min={0}
              value={companyDetails.averageNumber}
              onChange={(value) => handleNumberChange(value, "averageNumber")}
            />
          </Form.Item>

          <h2>Contact person</h2>

          <Form.Item label="Last Name">
            <Input
              name="lastName"
              value={contactPerson.lastName}
              onChange={handleContactPersonChange}
            />
          </Form.Item>
          <Form.Item label="First Name">
            <Input
              name="firstName"
              value={contactPerson.firstName}
              onChange={handleContactPersonChange}
            />
          </Form.Item>
          <Form.Item label="Second Name">
            <Input
              name="secondName"
              value={contactPerson.secondName}
              onChange={handleContactPersonChange}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              name="email"
              value={contactPerson.contact.email}
              onChange={handleContactInfoChange}
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              name="phone"
              value={contactPerson.contact.phone}
              onChange={handleContactInfoChange}
            />
          </Form.Item>

          <h2>Founders</h2>
          <h3>Founder companies</h3>

          <Form.Item label="ID">
            <Input
              name="id"
              value={founderCompanies.id}
              onChange={handleFounderCompaniesChange}
            />
          </Form.Item>

          <h3>Guarantee Company Info</h3>
          <Form.Item label="Guarantee Org Type">
            <Input
              name="guaranteeOrgType"
              value={founderCompanies.guaranteeCompanyInfo.guaranteeOrgType}
              onChange={handleGuaranteeCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="Full Name">
            <Input
              name="fullName"
              value={founderCompanies.guaranteeCompanyInfo.fullName}
              onChange={handleGuaranteeCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="Short Name">
            <Input
              name="shortName"
              value={founderCompanies.guaranteeCompanyInfo.shortName}
              onChange={handleGuaranteeCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="OKOPF">
            <Input
              name="okopf"
              value={founderCompanies.guaranteeCompanyInfo.okopf}
              onChange={handleGuaranteeCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="OKFS">
            <Input
              name="okfs"
              value={founderCompanies.guaranteeCompanyInfo.okfs}
              onChange={handleGuaranteeCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="OKPO">
            <Input
              name="okpo"
              value={founderCompanies.guaranteeCompanyInfo.okpo}
              onChange={handleGuaranteeCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="OKVED">
            <Input
              name="okved"
              value={founderCompanies.guaranteeCompanyInfo.okved}
              onChange={handleGuaranteeCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="OKVED Name">
            <Input
              name="okvedName"
              value={founderCompanies.guaranteeCompanyInfo.okvedName}
              onChange={handleGuaranteeCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="INN">
            <Input
              name="inn"
              value={founderCompanies.guaranteeCompanyInfo.inn}
              onChange={handleGuaranteeCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="KPP">
            <Input
              name="kpp"
              value={founderCompanies.guaranteeCompanyInfo.kpp}
              onChange={handleGuaranteeCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="OGRN">
            <Input
              name="ogrn"
              value={founderCompanies.guaranteeCompanyInfo.ogrn}
              onChange={handleGuaranteeCompanyInfoChange}
            />
          </Form.Item>
          <Form.Item label="Reg Date Before 01.07.2002">
            <DatePicker
              onChange={(date, dateString) =>
                handleFounderCompaniesDateChange(
                  date,
                  dateString,
                  "regDateBefore01072002"
                )
              }
            />
          </Form.Item>
          <Form.Item label="Registration Date">
            <DatePicker
              onChange={(date, dateString) =>
                handleFounderCompaniesDateChange(date, dateString, "regDate")
              }
            />
          </Form.Item>

          <FounderCompanyForm
            founderCompany={founderCompany}
            setFounderCompany={setFounderCompany}
          />
          <BankGuaranteeForm
            bankGuarantee={bankGuarantee}
            setBankGuarantee={setBankGuarantee}
          />
          <br />
          <br />
          <Button type="primary" onClick={handleSubmit}>
            Отправить
          </Button>
        </div>
      )}
    </GuaranteesField>
  );
};
