"use client" // This line is required because we are using 'useEffect', which is a client-side hook.

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';


export default function Home() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [mainCurrency, setMainCurrency] = useState<string>('');
  const [secondaryCurrencies, setSecondaryCurrencies] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedSecondaryCurrency, setSelectedSecondaryCurrency] = useState<string>('');

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/usd');
        const data = await response.json();
        const currencyCodes = Object.keys(data.rates);
        setCurrencies(currencyCodes);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryNames = data.map((country: any) => country.name.common).sort();
        setCountries(countryNames);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCurrencies();
    fetchCountries();
  }, []);

  const handleMainCurrencyChange = (currency: string) => {
    setMainCurrency(currency);
  };

  const handleSecondaryCurrenciesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const values = event.target.value.split(',').map(value => value.trim()).filter(value => value !== '');
    setSecondaryCurrencies(values);
  };

  const handleSecondaryCurrencyChange = (currency: string) => {
    setSelectedSecondaryCurrency(currency);
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  }

  return (
    <div className="container mx-auto p-6 text-gray-800" style={{ backgroundColor: '#D3D3D3', color: '#4B0082' }}>
      <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#4B0082' }}>FinWise</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-md rounded-lg p-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium">User Settings </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select onValueChange={handleCountryChange} defaultValue={selectedCountry}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="main-currency">Main Currency</Label>
              <Select onValueChange={handleMainCurrencyChange} defaultValue={mainCurrency}>
                <SelectTrigger id="main-currency">
                  <SelectValue placeholder="Select main currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="secondary-currencies">Secondary Currencies</Label>
              <Input type="text" id="secondary-currencies" placeholder="Enter secondary currencies (comma-separated)" 
              value={secondaryCurrencies.join(', ')}
              onChange={handleSecondaryCurrenciesChange}/>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md rounded-lg p-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Upload Financial Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Acceptable formats: DOC, DOCX, PDF, PNG, JPG, TXT</p>
            <div className="flex justify-center">
              <Button className="bg-gray-200 text-gray-800 hover:bg-gray-300" style={{ color: '#4B0082' }}>Upload</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 flex flex-col items-center">
        <div className="w-full md:w-1/2">
          <Card className="bg-white shadow-md rounded-lg p-6">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Current Exchange Rate</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="secondary-currency">Secondary Currency for Exchange Rate</Label>
              <Select onValueChange={handleSecondaryCurrencyChange} defaultValue={selectedSecondaryCurrency}>
                <SelectTrigger id="secondary-currency">
                  <SelectValue placeholder="Select secondary currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            <Label htmlFor="exchange-rate">Exchange rate: {mainCurrency}/{selectedSecondaryCurrency}</Label>
            <Input type="number" id="exchange-rate" placeholder="Enter exchange rate" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card className="bg-white shadow-md rounded-lg p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center mb-4" style={{ color: '#4B0082' }}>
              Main Financial Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded" style={{ border: '1px solid #4B0082' }}>
              <h3 className="font-semibold text-lg">Starting Money</h3>
            </div>
            <div className="p-4 rounded" style={{ border: '1px solid #4B0082' }}>
              <h3 className="font-semibold text-lg">Expenses by Category</h3>
            </div>
            <div className="p-4 rounded" style={{ border: '1px solid #4B0082' }}>
              <h3 className="font-semibold text-lg">Savings</h3>
            </div>
            <div className="p-4 rounded" style={{ border: '1px solid #4B0082' }}>
              <h3 className="font-semibold text-lg">Variation Against Previous Month</h3>
            </div>
            <div className="p-4 rounded" style={{ border: '1px solid #4B0082' }}>
              <h3 className="font-semibold text-lg">AI-Driven Insights</h3>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
