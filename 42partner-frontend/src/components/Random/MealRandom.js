// import React, { useState } from 'react';
// // import MealOption from './MealOption';
// import '../../styles/Random.scss';
// import cn from 'classnames';
// import { Button } from '@material-ui/core/index';
// import MealOption from './MealOption';
// import MealMatching from './MealMatching';

// const MealRandom = () => {
//   const [showBack, setShowBack] = useState(false);

//   const handleClick = () => {
//     setShowBack(!showBack);
//   };

//   return (
//     <div className="flip-card-outer">
//       <Button onClick={handleClick}>click</Button>
//       <div
//         className={cn('flip-card-inner', {
//           showBack,
//         })}
//       >
//         <div className="card front">
//           <div className="card-body d-flex justify-content-center align-items-center">
//             <p className="card-text fs-1 fw-bold">
//               <MealOption />
//             </p>
//           </div>
//         </div>
//         <div className="card back">
//           <div className="card-body d-flex justify-content-center align-items-center">
//             <p className="card-text fs-1 fw-bold">
//               <MealMatching />
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MealRandom;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import MealOption from './MealOption';
import '../../styles/Random.scss';
import cn from 'classnames';
import { Button } from '@material-ui/core/index';
import RandomOption from './MealOption';
import MealMatching from './MealMatching';

const RandomContainer = () => {
  const location = useLocation();
  const [topic, setTopic] = useState('MEAL');
  const [showBack, setShowBack] = useState(false);

  const handleClick = () => {
    setShowBack(!showBack);
  };

  useEffect(() => {
    if (location.pathname.includes('meal')) {
      setTopic('MEAL');
    } else {
      setTopic('STUDY');
    }
  }, [location]);

  return (
    <div className="flip-card-outer">
      <Button onClick={handleClick}>click</Button>
      <div
        className={cn('flip-card-inner', {
          showBack,
        })}
      >
        <div className="card front">
          <div className="card-body d-flex justify-content-center align-items-center">
            <p className="card-text fs-1 fw-bold">
              <RandomOption topic={topic} />
            </p>
          </div>
        </div>
        <div className="card back">
          <div className="card-body d-flex justify-content-center align-items-center">
            <p className="card-text fs-1 fw-bold">
              <MealMatching />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomContainer;
