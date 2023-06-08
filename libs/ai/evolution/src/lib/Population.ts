import { LayersModel } from "@tensorflow/tfjs-node";
import { ModelGenerator, NeuralNetwork } from "./NeuralNetwork";

export type NextGenerationOptions = {
    useParents?: number;
    keepParents?: number;
};

export type PopulationFeedback = {
    generation: number;
    model: LayersModel;
    highscore: number;
};

export class Population {
    private generation = 0;
    private agents: NeuralNetwork[];

    constructor(
        private readonly size: number,
        modelGenerator: ModelGenerator,
        private readonly score: (model: LayersModel) => number,
        private readonly generationFeedback: (highscore: PopulationFeedback) => void = () => {},
        mutationProbability = 0.05,
    ) {
        this.agents = Array.from(
            { length: size },
            () => new NeuralNetwork(modelGenerator, { mutationProbability }),
        );
    }

    dispose() {
        this.agents.forEach(a => a.dispose());
    }

    next({ useParents = 5, keepParents = 3 }: NextGenerationOptions = {}) {
        const agents = this.agents;
        const scores = agents.map(({ model }) => this.score(model));

        let feedback: PopulationFeedback;
        agents.forEach(({ model }, idx) => {
            const score = scores[idx];
            if (typeof feedback === "undefined" || score > feedback.highscore) {
                feedback = {
                    generation: this.generation,
                    highscore: score,
                    model,
                };
            }
        });
        this.generationFeedback(feedback);

        agents.sort((a, b) => (scores[agents.indexOf(a)] > scores[agents.indexOf(b)] ? -1 : 1));
        const parents = agents.slice(0, useParents);
        const parentPairs = parents.flatMap((parent1, idx) =>
            parents.slice(idx + 1).map(parent2 => [parent1, parent2] as const),
        );

        this.agents = parents.slice(0, keepParents);
        agents
            .slice(keepParents)
            .forEach((_, idx) =>
                this.agents.push(
                    NeuralNetwork.fromParents(...parentPairs[idx % parentPairs.length]),
                ),
            );

        agents.slice(keepParents).forEach(a => a.dispose());
        ++this.generation;
    }
}
