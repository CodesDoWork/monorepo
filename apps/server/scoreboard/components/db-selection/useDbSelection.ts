import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { Database } from "../../types/types";
import { trpc } from "../../app/trpc";

export type UseDbSelectionProps = {
    onSuccess: () => void;
};

export const useDbSelection = ({ onSuccess }: UseDbSelectionProps) => {
    const inputId = useId();

    const [value, setValue] = useState("");
    const [dbs, setDBs] = useState<Database[]>([]);

    useEffect(() => {
        trpc.getDBs.query({}).then(res => {
            setDBs(res.databases);
            setValue(res.databases[0].id);
        });
    }, [setDBs, setValue]);

    const dbOptions = useMemo(() => dbs.map(db => ({ key: db.id, value: db.title })), [dbs]);

    const onSelect = useCallback(() => {
        trpc.selectDB.query({ db: value }).then(() => {
            onSuccess();
        });
    }, [value, onSuccess]);

    return { inputId, dbOptions, value, setValue, onSelect };
};
