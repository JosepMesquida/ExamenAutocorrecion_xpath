<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
 <head>
  <link rel="stylesheet" type="text/css" href="../css/xml-transform.css"/>
 </head>
 <body>
  <h2>Preguntas Examen Tema Internet</h2>
  <table>
   <tr>
    <th>Title</th>
    <th>Option</th>
    <th>Answer</th>
   </tr>
   <xsl:for-each select="questions/question">
   <tr>
    <td><xsl:value-of select="title"/></td>
   <td>
    <xsl:for-each select="option">
    P<xsl:value-of select="position()"/>: <xsl:value-of select="text()"/><br/>
    </xsl:for-each>
   </td>
   <td class="respuesta">
    <xsl:for-each select="answer">
     <xsl:value-of select="text()"/><br/>
    </xsl:for-each> 
   </td>
   </tr>
   </xsl:for-each>
  </table>
 </body>
</html>
</xsl:template>

</xsl:stylesheet>