import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './header/Profile'; // Import your Profile component

// ... other imports ...

function AppRouter() {
  return (
    <Router>
      <Switch>
        {/* ... Other routes ... */}
        <Route path="/dashboard/profile" component={Profile} />
        {/* ... Other routes ... */}
      </Switch>
    </Router>
  );
}

export default AppRouter;



