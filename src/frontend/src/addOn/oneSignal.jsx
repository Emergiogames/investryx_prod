import React, { useEffect } from 'react';
import OneSignal from 'onesignal-cordova-plugin';

const OneSignalSetup = () => {
    useEffect(() => {
        OneSignal.init({
            appId: 'YOUR-ONESIGNAL-APP-ID',
        });

        OneSignal.showSlidedownPrompt(); // Show the push notification prompt

        OneSignal.on('notificationDisplay', function(event) {
            console.log('OneSignal notification displayed:', event);
        });

        // Handle the subscription change
        OneSignal.on('subscriptionChange', function (isSubscribed) {
            console.log("The user's subscription state is now:", isSubscribed);
        });
    }, []);

    return null;
};

export default OneSignalSetup;
