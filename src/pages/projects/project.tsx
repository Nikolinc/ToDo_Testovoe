import React, { useState } from 'react'
import "./project.css"
import Profile from 'components/profile/profile'
import Dashboard from 'components/dashboard/dashboard'
import NewProject from 'components/NewProject/newProject'
import { useSearchParams } from 'react-router-dom'

export default function Project() {

  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q") || "";

  return <div className="projects-page">
    <div className="leftArea">
      <Profile />
      <Dashboard />
      <NewProject />
    </div>
    <div className="project">
      <input
        type="search"
        id="search"
        placeholder="Search..."
        value={q}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchParams(
            prev => {
              prev.set("q", e.target.value)
              return prev
            }
          )
        }} />

    </div>
  </div>
}