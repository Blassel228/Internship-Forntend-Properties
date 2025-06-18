import Row from "./Row.tsx";
import Column from "./Column.tsx";
import React from "react";
import ContainerWithBorders from "./ContainerWithBorders.tsx";
import CustomCheckbox from "./CustomCheckbox.tsx";

const BasicDetailsInputSection = () => {
  return(
    <form className="userInfoSection w-full h-full gap-5 items-center flex flex-col">
      <ContainerWithBorders className="basicDataSection">
        <div>
          <h1 className="font-bold text-xl">Enter your data</h1>
          <p className="text-green-600 leading-7 text-[13px]">
            Everything is almost done! All remains is entering your data.<br />
            Please enter your data in Latin, so the administration could understand it.
          </p>
        </div>
        <Row className="w-full gap-5">
          <Column className="w-[23rem]">
            <label htmlFor="name">Name (latin)</label>
            <input
              className="border rounded pl-2 py-1 w-full"
              type="text"
              id="name"
              placeholder="For example: John"
            />
          </Column>

          <Column className="w-[23rem]">
            <label htmlFor="surname">Surname (latin)</label>
            <input
              className="border rounded pl-2 py-1 w-full"
              type="text"
              id="surname"
              placeholder="For example: Smith"
            />
          </Column>
        </Row>
        <Column className="w-[23rem] gap-1">
          <label htmlFor="email">Email Address</label>
          <input
            className="border rounded pl-2 py-1 w-full"
            type="email"
            id="email"
          />
          <p className="text-xs">Booking confirmation will be sent to here.</p>
        </Column>
        <Column className="w-[23rem]">
          <label htmlFor="country">Country/region</label>
          <input
            className="border rounded pl-2 py-1 w-full"
            type="text"
            id="country"
          />
        </Column>
        <Column className="w-[23rem] gap-1">
          <label htmlFor="phone">Phone (latin)</label>
          <input
            className="border rounded pl-2 py-1 w-full"
            type="tel"
            id="phone"
          />
          <p className="text-xs">To confirm your booking and allow the accommodation team to contact you if needed.</p>
        </Column>
        <Row >
          <CustomCheckbox />
          <p className="text-xs ml-2 content-center">Yes, I want to get an electronic confirmation to my Email address.</p>
        </Row>
        <Column className="gap-2">
          <h1 className="font-bold">Who are you booking for?</h1>
          <Row>
            <input type="radio" name="emailConfirmation" className="h-6 w-6"/>
            <p className="text-xs content-center ml-2">I am the main guest </p>
          </Row>
          <Row>
            <input type="radio" name="emailConfirmation" className="h-6 w-6"/>
            <p className="text-xs content-center ml-2">This booking is not for me</p>
          </Row>
        </Column>
      </ContainerWithBorders>
      <ContainerWithBorders>
        <h1 className="font-bold text-xl">Useful to know</h1>
        <p className="leading-7">
          Keep yourself free: you can cancel booking for free before 17th of July,
          so make a booking for this wonderful price now!
        </p>
      </ContainerWithBorders>
    </form>
  )
}

export default BasicDetailsInputSection;