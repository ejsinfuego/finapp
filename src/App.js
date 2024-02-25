import './App.css';
import React from 'react';
import Table from './Table';
import { Button, Form, Container, Header } from 'semantic-ui-react';
import axios from 'axios'
import { useState } from 'react';
import private_key from './capstone-399709-712e8365480b.json'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';


// File handling package
const fs = require('fs');

// spreadsheet key is the long id in the sheets URL
const RESPONSES_SHEET_ID = '1sIQvLgPdJvrZugdGyKPmpjB1ApiAuMdCpjJD1fh2YLM';

// Create a new document
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

// Credentials for the service account
const CREDENTIALS = JSON.parse(fs.readFileSync(private_key));

const addRow = async (rows) => {

  // use service account creds
  await doc.useServiceAccountAuth({
      client_email: CREDENTIALS.client_email,
      private_key: CREDENTIALS.private_key
  });

  await doc.loadInfo();

  // Index of the sheet
  let sheet = doc.sheetsByIndex[0];

  for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      await sheet.addRow(row);
  }
};


let rows = [{
  email: 'email@email.com',
  user_name: 'ramesh',
  password: 'abcd@1234'
}, {
  email: 'email@gmail.com',
  user_name: 'dilip',
  password: 'abcd@1234'
}];


const columns = [
	{
		name: 'Title',
		selector: row => row.title,
    sortable: true,
	},
	{
		name: 'Year',
		selector: row => row.year,
    sortable: true,
	},
];

console.log(private_key.private_key);

const data = [
  	{
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
	},
]

// const submitHandler = e => {
//   e.preventDefault();
//   console.log(this.state);

//   axios.post('https://sheet.best/api/sheets/04ca28ec-0fe4-41fb-a463-637f7259c7d3', this.state)
//   .then(response => {
//     console.log(response);
//   })
// }


function App() {

  const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [salary, setSalary] = useState('');
	const [hobby, setHobby] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const objt = { name, age, salary, hobby };

		axios
			.post(
				'https://sheet.best/api/sheets/04ca28ec-0fe4-41fb-a463-637f7259c7d3',
				objt,
			)
			.then((response) => {
				console.log(response);
			});
	};
  
  return (
    <>
    <div className="flex flex-col just w-1/2">
     <Table columns={columns} data={data} />
      <br />
    </div>
    <div className="justify-center flex">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Export to Google Sheets
      </button>
    </div>
    <div className="justify-center flex">
    <Container fluid className="container">
			<Header as="h2">React google sheet</Header>
			<Form className="form">
				<Form.Field>
					<label>Name</label>
					<input
						placeholder="Enter your Name"
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Field>
				<Form.Field>
					<label>Age</label>
					<input
						placeholder="Enter your Age"
						onChange={(e) => setAge(e.target.value)}
					/>
				</Form.Field>
				<Form.Field>
					<label>Salary</label>
					<input
						placeholder="Enter your Salary"
						onChange={(e) => setSalary(e.target.value)}
					/>
				</Form.Field>
				<Form.Field>
					<label>Hobby</label>
					<input
						placeholder="Enter your Hobby"
						onChange={(e) => setHobby(e.target.value)}
					/>
				</Form.Field>

				<Button color="blue" type="submit" onClick={addRow}>
					Submit
				</Button>
			</Form>
		</Container>
      </div>
    </>
    
    
  );
}

export default App;
