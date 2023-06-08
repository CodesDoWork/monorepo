import { LayersModel, Tensor, tensor } from "@tensorflow/tfjs-node";

type NeuralNetworkOptions = {
    weights?: Tensor[];
    mutationProbability?: number;
};

export type ModelGenerator = () => LayersModel;

export class NeuralNetwork {
    readonly model: LayersModel;
    private readonly mutationProbability: number;

    constructor(
        readonly modelGenerator: ModelGenerator,
        { weights, mutationProbability = 0.05 }: NeuralNetworkOptions = {},
    ) {
        this.model = modelGenerator();
        this.mutationProbability = mutationProbability;
        if (weights) {
            this.model.setWeights(weights);
        }
    }

    getWeights() {
        return this.model.getWeights();
    }

    dispose() {
        this.model.dispose();
    }

    static fromParents(a: NeuralNetwork, b: NeuralNetwork) {
        const weightsA = a.getWeights();
        const weightsB = b.getWeights();

        const weights = Array.from(weightsA, (layerWeightsATensor, layerIdx) => {
            const layerWeightsA = layerWeightsATensor.dataSync<"float32">();
            const layerWeightsB = weightsB[layerIdx].dataSync<"float32">();

            return tensor(
                Array.from(layerWeightsA, (_, weightIdx) => {
                    if (Math.random() < a.mutationProbability) {
                        return Math.random() * 2 - 1;
                    }

                    return Math.random() < 0.5
                        ? layerWeightsA[weightIdx]
                        : layerWeightsB[weightIdx];
                }),
                layerWeightsATensor.shape,
            );
        });

        return new NeuralNetwork(a.modelGenerator, {
            weights,
            mutationProbability: a.mutationProbability,
        });
    }
}
