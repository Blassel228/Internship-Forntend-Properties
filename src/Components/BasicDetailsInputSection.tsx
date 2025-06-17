import Row from "./Row.tsx";
import Column from "./Column.tsx";
import React from "react";

const BasicDetailsInputSection = () => {
  return(
    <Column className="basicDataSection w-full gap-2 border-gray-300 border py-4 px-5 rounded">
      <div className="">
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
      <Column className="w-[23rem]">
        <label htmlFor="email">Email Address</label>
        <input
          className="border rounded pl-2 py-1 w-full"
          type="email"
          id="email"
        />
      </Column>
      <Column className="w-[23rem]">
        <label htmlFor="country">Country/region</label>
        <input
          className="border rounded pl-2 py-1 w-full"
          type="text"
          id="country"
        />
      </Column>
      <Column className="w-[23rem]">
        <label htmlFor="phone">Phone (latin)</label>
        <input
          className="border rounded pl-2 py-1 w-full"
          type="tel"
          id="phone"
        />
      </Column>
    </Column>
  )
}

export default BasicDetailsInputSection;