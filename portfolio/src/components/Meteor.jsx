import { useEffect, useState } from "react";

const Meteor = () => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    generateMeteors();
  }, []); // ✅ only run once!

  const generateMeteors = () => {
    const numberOfMeteors = 4;
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 4 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 15,
        animationDuration: Math.random() * 3 + 3,
      });
    }

    setMeteors(newMeteors);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: meteor.size * 2 + "px",
            height: meteor.size * 20 + "px", // make them longer
            left: meteor.x + "%",
            top: meteor.y + "%",
            animationDelay: meteor.delay + "s",
            animationDuration: meteor.animationDuration + "s",
          }}
        ></div>
      ))}
    </div>
  );
};

export default Meteor;