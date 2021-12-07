export const isParseError = (parsedDocument) => {
    // parser and parsererrorNS could be cached on startup for efficiency
    const parser = new DOMParser();
    const errorneousParse = parser.parseFromString('<', 'application/xml');
    const parsererrorNS =
        errorneousParse.getElementsByTagName('parsererror')[0].namespaceURI;

    if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
        // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
        return parsedDocument.getElementsByTagName('parsererror').length > 0;
    }

    return (
        parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror')
            .length > 0
    );
};

export const validXmlString = (xmlString) => {
    if (!xmlString) {
        return true;
    }

    const parser = new DOMParser();
    const dom = parser.parseFromString(xmlString, 'application/xml');

    return !isParseError(dom);
};

export const xmlStrFormatPretty = (data) => {
    if (data && typeof data === 'string') {
        if (!validXmlString(data)) {
            return data;
        }

        try {
            const xmlDoc = new DOMParser().parseFromString(
                data,
                'application/xml'
            );
            const xsltDoc = new DOMParser().parseFromString(
                [
                    // describes how we want to modify the XML - indent everything
                    '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
                    '  <xsl:strip-space elements="*"/>',
                    '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
                    '    <xsl:value-of select="normalize-space(.)"/>',
                    '  </xsl:template>',
                    '  <xsl:template match="node()|@*">',
                    '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
                    '  </xsl:template>',
                    '  <xsl:output indent="yes"/>',
                    '</xsl:stylesheet>'
                ].join('\n'),
                'application/xml'
            );

            const xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsltDoc);
            const resultDoc = xsltProcessor.transformToDocument(xmlDoc);
            const resultXml = new XMLSerializer().serializeToString(resultDoc);
            return resultXml;
        } catch (e) {
            return data;
        }
    } else {
        return '';
    }
};

export const xmlStrFormatNotPretty = (data) => {
    // TODO
    return data;
};
