const SqlQueries = {
    mdfLdf: `SELECT [FILE_Name] = A.name,[TYPE] = A.TYPE_DESC,[FILEGROUP_Name] = fg.name,[File_Location] = A.PHYSICAL_NAME
        ,[FILESIZE_MB] = CONVERT(DECIMAL(10,2),A.SIZE/128.0),[USEDSPACE_MB] = CONVERT(DECIMAL(10,2),A.SIZE/128.0 - ((SIZE/128.0) - CAST(FILEPROPERTY(A.NAME, 'SPACEUSED') AS INT)/128.0))
        ,[FREESPACE_MB] = CONVERT(DECIMAL(10,2),A.SIZE/128.0 - CAST(FILEPROPERTY(A.NAME, 'SPACEUSED') AS INT)/128.0),[FREESPACE_%] = CONVERT(DECIMAL(10,2),((A.SIZE/128.0 - CAST(FILEPROPERTY(A.NAME, 'SPACEUSED') AS INT)/128.0)/(A.SIZE/128.0))*100)
        ,[AutoGrow] = 'By ' + CASE is_percent_growth WHEN 0 THEN CAST(growth/128 AS VARCHAR(10)) + ' MB -' WHEN 1 THEN CAST(growth AS VARCHAR(10)) + '% -' ELSE '' END + CASE max_size WHEN 0 THEN 'DISABLED' WHEN -1 THEN ' Unrestricted' 
        ELSE ' Restricted to ' + CAST(max_size/(128*1024) AS VARCHAR(10)) + ' GB' END + CASE is_percent_growth WHEN 1 THEN ' [autogrowth by percent, BAD setting!]' ELSE '' END
        FROM sys.database_files A LEFT JOIN sys.filegroups fg ON A.data_space_id = fg.data_space_id ORDER BY A.TYPE desc, A.NAME;`,
    indexFragment: `SELECT [Schema] = dbschemas.[name],[Table] = dbtables.[name],[Index] = dbindexes.[name]
        ,[Avg_Framentation_%] = indexstats.[avg_fragmentation_in_percent],[Page_Count] = indexstats.[page_count],
        [SqlScript] = CASE 
        WHEN indexstats.[avg_fragmentation_in_percent] > 30 THEN 'ALTER INDEX [' + dbindexes.[name] + '] ON [' + dbschemas.[name] + '].[' + dbtables.[name] + '] REBUILD  WITH (ONLINE = ON)'
        WHEN indexstats.[avg_fragmentation_in_percent] > 5 AND indexstats.[avg_fragmentation_in_percent] < 30 THEN 'ALTER INDEX [' + dbindexes.[name] + '] ON [' + dbschemas.[name] + '].[' + dbtables.[name] + '] REORGANIZE'
        ELSE NULL END 	
        FROM [sys].[dm_db_index_physical_stats] (DB_ID(), NULL, NULL, NULL, NULL) AS indexstats
        INNER JOIN [sys].[tables] AS dbtables ON dbtables.[object_id] = indexstats.[object_id]
        INNER JOIN [sys].[schemas] AS dbschemas ON dbtables.[schema_id] = dbschemas.[schema_id]
        INNER JOIN [sys].[indexes] AS dbindexes ON dbindexes.[object_id] = indexstats.[object_id] AND indexstats.index_id = dbindexes.index_id
        WHERE indexstats.[database_id] = DB_ID() AND dbindexes.[name] IS NOT NULL AND indexstats.[avg_fragmentation_in_percent] > 0.00 ORDER BY indexstats.[avg_fragmentation_in_percent] DESC`,
        //...
}

export default SqlQueries