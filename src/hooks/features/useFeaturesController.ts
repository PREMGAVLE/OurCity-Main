import { useEffect, useState } from "react";

import init,{ Features,Feature} from "../../../public/wasm/rust_app_bl";
import {addFeature, getAllFeatures, seedDefaultFeatures} from '../../../rx/featureList'
import { FeatureItem } from "rx/type";
export default function useFeaturesController() {
    const [featureName, setFeatureName] = useState("Education");
    const [featuresList, setFeaturesList] = useState<Feature[]>([]);
    // const getFeaturesList=()
  
    useEffect(() => {
        const fetchFeatures = async () => {
            await seedDefaultFeatures();
           const featureData:FeatureItem[] = await getAllFeatures();
            // await init(); // Initialize WASM
            // const FeaturesInstance = new Features(featureName); // Create an instance
            // const featureData:Feature[] = FeaturesInstance.get_features(); // Fetch features
            console.log("featuresList>>>>",featureData)
            setFeaturesList(featureData);
        };

        fetchFeatures();
    }, [featureName]);
  return {
    featureName, setFeatureName,featuresList,
    Feature
  }
}
