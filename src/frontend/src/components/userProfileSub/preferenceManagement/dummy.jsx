{
    "id": 5,
    "user": 9,
    "profile": "investor",//    profile, interested_city, interested_state, investment_interest, investment_horizon, frequency,

    "interested_city": "yvhvh",//
    "interested_state": "guguh",//
    "investment_interest": "Real estate",//
    "investment_horizon": "Medium-Term",//
    "frequency": "Weekly",//
    "advisor_experience": null,
    "advisory_duration": null,
    "budget": null,
    "business_duration": null,
    "business_goal": null,
    "business_stage": null,
    "buy_start": null,
    "city": null,
    "client_type": null,
    "expertise": null,
    "franchise_brands": null,
    "franchise_type": null,
    "industries": null,
    "investment_experience": null,
    "price_ending": null,//
    "price_starting": null,//
    "risk_tolerance": null,
    "state": null,
    "type": null
  }


  st AllPrefData = pref ?  [
    { key: "Profile", value: pref.profile || "N/A" },
    { key: "Interested City", value: pref.interested_city || "N/A" },
    { key: "Interested State", value: pref.interested_state || "N/A" },
    { key: "Investment Interest", value: pref.investment_interest || "N/A" },
    { key: "Investment Horizon", value: pref.investment_horizon || "N/A" },
    { key: "Frequency", value: pref.frequency || "N/A" },
    { key: "Advisor Experience", value: pref.advisor_experience || "N/A"},
    { key: "Range Starting", value: pref.price_starting || "N/A"},
    { key: "Range Ending", value: pref.price_ending || "N/A"}
] : []
  
Profile, Interested City, Interested State, Investment Interest, Investment Horizon,
Frequency, Advisor Experience, Range Starting, Range Ending
