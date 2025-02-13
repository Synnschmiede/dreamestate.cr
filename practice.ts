const featureOptions = [
    {
        title: 'Interio feature 1',
        type: 'Interior'
    },
    {
        title: 'Outdoor feature 1',
        type: 'Outdoor'
    },
    {
        title: 'Interior feature 2',
        type: 'Interior'
    },
    {
        title: 'Electricity',
        type: 'Utilities'
    }
]

const test = [
    {
        name: "Electricity",
        feature_group: {
            name: "Utilities"
        }
    },
    {
        name: "Interior feature 1",
        feature_group: {
            name: "Interior"
        }
    },
    {
        name: "Interior feature 2",
        feature_group: {
            name: "Interior"
        }
    }
]

test.reduce((acc: { group_name: string, features: string[] }[], feature: any) => {
    const group = acc.find((g) => g.group_name === feature.feature_group.name);
    if (group) {
        group.features.push(feature.name);
    } else {
        acc.push({
            group_name: feature.feature_group.name,
            features: [feature.name]
        });
    }
    return acc;
}, [])
